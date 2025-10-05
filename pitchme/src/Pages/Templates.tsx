import React, { useState } from 'react';

interface Template {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
}

const Templates: React.FC = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    // Placeholder templates - we'll replace with actual data later
    const templates: Template[] = [
        {
            id: 'modern',
            name: 'Modern',
            description: 'Clean and contemporary design',
            thumbnail: '/templates/modern.png'
        },
        {
            id: 'professional',
            name: 'Professional',
            description: 'Traditional corporate style',
            thumbnail: '/templates/professional.png'
        },
        {
            id: 'creative',
            name: 'Creative',
            description: 'Stand out with unique layout',
            thumbnail: '/templates/creative.png'
        },
        {
            id: 'minimalist',
            name: 'Minimalist',
            description: 'Simple and elegant',
            thumbnail: '/templates/minimalist.png'
        }
    ];

    const handleSelectTemplate = (templateId: string) => {
        setSelectedTemplate(templateId);
    };

    const handleContinue = () => {
        if (selectedTemplate) {
            // Navigate to builder with selected template
            console.log('Selected template:', selectedTemplate);
        }
    };

    return (
        <div className="templates-page">
            <div className="templates-header">
                <h1>Choose Your Template</h1>
                <p>Select a template that best represents your professional style</p>
            </div>

            <div className="templates-grid">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                        onClick={() => handleSelectTemplate(template.id)}
                    >
                        <div className="template-thumbnail">
                            <img src={template.thumbnail} alt={template.name} />
                        </div>
                        <div className="template-info">
                            <h3>{template.name}</h3>
                            <p>{template.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="templates-footer">
                <button
                    onClick={handleContinue}
                    disabled={!selectedTemplate}
                    className="btn-primary"
                >
                    Continue with Selected Template
                </button>
            </div>
        </div>
    );
};

export default Templates;