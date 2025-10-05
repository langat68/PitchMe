import React, { useState } from 'react';

interface Education {
    id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrentlyStudying: boolean;
    gpa: string;
    achievements: string;
}

interface EducationFormProps {
    onSubmit?: (data: Education[]) => void;
    initialData?: Education[];
}

const EducationForm: React.FC<EducationFormProps> = ({
    onSubmit,
    initialData = []
}) => {
    const [educations, setEducations] = useState<Education[]>(
        initialData.length > 0 ? initialData : [{
            id: crypto.randomUUID(),
            school: '',
            degree: '',
            fieldOfStudy: '',
            location: '',
            startDate: '',
            endDate: '',
            isCurrentlyStudying: false,
            gpa: '',
            achievements: '',
        }]
    );

    const handleChange = (id: string, field: keyof Education, value: string | boolean) => {
        setEducations(prev => prev.map(edu =>
            edu.id === id ? { ...edu, [field]: value } : edu
        ));
    };

    const handleAddEducation = () => {
        setEducations(prev => [...prev, {
            id: crypto.randomUUID(),
            school: '',
            degree: '',
            fieldOfStudy: '',
            location: '',
            startDate: '',
            endDate: '',
            isCurrentlyStudying: false,
            gpa: '',
            achievements: '',
        }]);
    };

    const handleRemoveEducation = (id: string) => {
        if (educations.length > 1) {
            setEducations(prev => prev.filter(edu => edu.id !== id));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(educations);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="education-form">
            <div className="form-header">
                <h3>Education</h3>
                <button
                    type="button"
                    className="add-button"
                    onClick={handleAddEducation}
                >
                    + Add Education
                </button>
            </div>

            {educations.map((edu, index) => (
                <div key={edu.id} className="education-entry">
                    <div className="entry-header">
                        <h4>Education {index + 1}</h4>
                        {educations.length > 1 && (
                            <button
                                type="button"
                                className="remove-button"
                                onClick={() => handleRemoveEducation(edu.id)}
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor={`school-${edu.id}`}>School/University *</label>
                        <input
                            type="text"
                            id={`school-${edu.id}`}
                            value={edu.school}
                            onChange={(e) => handleChange(edu.id, 'school', e.target.value)}
                            placeholder="University of California"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor={`degree-${edu.id}`}>Degree *</label>
                            <select
                                id={`degree-${edu.id}`}
                                value={edu.degree}
                                onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                                required
                            >
                                <option value="">Select Degree</option>
                                <option value="High School Diploma">High School Diploma</option>
                                <option value="Associate's Degree">Associate's Degree</option>
                                <option value="Bachelor's Degree">Bachelor's Degree</option>
                                <option value="Master's Degree">Master's Degree</option>
                                <option value="Doctoral Degree">Doctoral Degree (PhD)</option>
                                <option value="MBA">MBA</option>
                                <option value="Certificate">Certificate</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor={`fieldOfStudy-${edu.id}`}>Field of Study *</label>
                            <input
                                type="text"
                                id={`fieldOfStudy-${edu.id}`}
                                value={edu.fieldOfStudy}
                                onChange={(e) => handleChange(edu.id, 'fieldOfStudy', e.target.value)}
                                placeholder="Computer Science"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor={`location-${edu.id}`}>Location *</label>
                        <input
                            type="text"
                            id={`location-${edu.id}`}
                            value={edu.location}
                            onChange={(e) => handleChange(edu.id, 'location', e.target.value)}
                            placeholder="Berkeley, CA"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor={`startDate-${edu.id}`}>Start Date *</label>
                            <input
                                type="month"
                                id={`startDate-${edu.id}`}
                                value={edu.startDate}
                                onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor={`endDate-${edu.id}`}>
                                {edu.isCurrentlyStudying ? 'End Date (Optional)' : 'End Date *'}
                            </label>
                            <input
                                type="month"
                                id={`endDate-${edu.id}`}
                                value={edu.endDate}
                                onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
                                disabled={edu.isCurrentlyStudying}
                                required={!edu.isCurrentlyStudying}
                            />
                        </div>
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={edu.isCurrentlyStudying}
                                onChange={(e) => handleChange(edu.id, 'isCurrentlyStudying', e.target.checked)}
                            />
                            I am currently studying here
                        </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor={`gpa-${edu.id}`}>GPA (Optional)</label>
                        <input
                            type="text"
                            id={`gpa-${edu.id}`}
                            value={edu.gpa}
                            onChange={(e) => handleChange(edu.id, 'gpa', e.target.value)}
                            placeholder="3.8/4.0"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor={`achievements-${edu.id}`}>Achievements & Activities (Optional)</label>
                        <textarea
                            id={`achievements-${edu.id}`}
                            value={edu.achievements}
                            onChange={(e) => handleChange(edu.id, 'achievements', e.target.value)}
                            placeholder="• Dean's List (2020-2023)&#10;• President of Computer Science Club&#10;• Relevant coursework: Data Structures, Machine Learning, Web Development"
                            rows={4}
                        />
                        <p className="help-text">Include honors, awards, clubs, relevant coursework, etc.</p>
                    </div>
                </div>
            ))}
        </form>
    );
};

export default EducationForm;