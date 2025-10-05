import React, { useState } from 'react';

interface Experience {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrentJob: boolean;
    description: string;
}

interface ExperienceFormProps {
    onSubmit?: (data: Experience[]) => void;
    initialData?: Experience[];
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
    onSubmit,
    initialData = []
}) => {
    const [experiences, setExperiences] = useState<Experience[]>(
        initialData.length > 0 ? initialData : [{
            id: crypto.randomUUID(),
            jobTitle: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            isCurrentJob: false,
            description: '',
        }]
    );

    const handleChange = (id: string, field: keyof Experience, value: string | boolean) => {
        setExperiences(prev => prev.map(exp =>
            exp.id === id ? { ...exp, [field]: value } : exp
        ));
    };

    const handleAddExperience = () => {
        setExperiences(prev => [...prev, {
            id: crypto.randomUUID(),
            jobTitle: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            isCurrentJob: false,
            description: '',
        }]);
    };

    const handleRemoveExperience = (id: string) => {
        if (experiences.length > 1) {
            setExperiences(prev => prev.filter(exp => exp.id !== id));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(experiences);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="experience-form">
            <div className="form-header">
                <h3>Work Experience</h3>
                <button
                    type="button"
                    className="add-button"
                    onClick={handleAddExperience}
                >
                    + Add Experience
                </button>
            </div>

            {experiences.map((exp, index) => (
                <div key={exp.id} className="experience-entry">
                    <div className="entry-header">
                        <h4>Experience {index + 1}</h4>
                        {experiences.length > 1 && (
                            <button
                                type="button"
                                className="remove-button"
                                onClick={() => handleRemoveExperience(exp.id)}
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor={`jobTitle-${exp.id}`}>Job Title *</label>
                            <input
                                type="text"
                                id={`jobTitle-${exp.id}`}
                                value={exp.jobTitle}
                                onChange={(e) => handleChange(exp.id, 'jobTitle', e.target.value)}
                                placeholder="Software Engineer"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor={`company-${exp.id}`}>Company *</label>
                            <input
                                type="text"
                                id={`company-${exp.id}`}
                                value={exp.company}
                                onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                                placeholder="Tech Corp"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor={`location-${exp.id}`}>Location *</label>
                        <input
                            type="text"
                            id={`location-${exp.id}`}
                            value={exp.location}
                            onChange={(e) => handleChange(exp.id, 'location', e.target.value)}
                            placeholder="San Francisco, CA"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor={`startDate-${exp.id}`}>Start Date *</label>
                            <input
                                type="month"
                                id={`startDate-${exp.id}`}
                                value={exp.startDate}
                                onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor={`endDate-${exp.id}`}>
                                {exp.isCurrentJob ? 'End Date (Optional)' : 'End Date *'}
                            </label>
                            <input
                                type="month"
                                id={`endDate-${exp.id}`}
                                value={exp.endDate}
                                onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                                disabled={exp.isCurrentJob}
                                required={!exp.isCurrentJob}
                            />
                        </div>
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={exp.isCurrentJob}
                                onChange={(e) => handleChange(exp.id, 'isCurrentJob', e.target.checked)}
                            />
                            I currently work here
                        </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor={`description-${exp.id}`}>Description *</label>
                        <textarea
                            id={`description-${exp.id}`}
                            value={exp.description}
                            onChange={(e) => handleChange(exp.id, 'description', e.target.value)}
                            placeholder="• Led development of new feature that increased user engagement by 40%&#10;• Collaborated with cross-functional teams to deliver projects on time&#10;• Mentored junior developers and conducted code reviews"
                            rows={6}
                            required
                        />
                        <p className="help-text">Use bullet points to describe your responsibilities and achievements</p>
                    </div>
                </div>
            ))}
        </form>
    );
};

export default ExperienceForm;