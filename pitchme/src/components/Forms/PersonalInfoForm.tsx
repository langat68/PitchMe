import React, { useState } from 'react';

interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
    github: string;
}

interface PersonalInfoFormProps {
    onSubmit?: (data: PersonalInfo) => void;
    initialData?: Partial<PersonalInfo>;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
    onSubmit,
    initialData = {}
}) => {
    const [formData, setFormData] = useState<PersonalInfo>({
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        location: initialData.location || '',
        linkedin: initialData.linkedin || '',
        portfolio: initialData.portfolio || '',
        github: initialData.github || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="personal-info-form">
            <div className="form-section">
                <h3>Basic Information</h3>

                <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john.doe@example.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone *</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 123-4567"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location *</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="City, State/Country"
                        required
                    />
                </div>
            </div>

            <div className="form-section">
                <h3>Online Presence (Optional)</h3>

                <div className="form-group">
                    <label htmlFor="linkedin">LinkedIn</label>
                    <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/johndoe"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="portfolio">Portfolio Website</label>
                    <input
                        type="url"
                        id="portfolio"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        placeholder="https://johndoe.com"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="github">GitHub</label>
                    <input
                        type="url"
                        id="github"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        placeholder="https://github.com/johndoe"
                    />
                </div>
            </div>
        </form>
    );
};

export default PersonalInfoForm;