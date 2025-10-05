import React, { useState } from 'react';

interface Summary {
    content: string;
}

interface SummaryFormProps {
    onSubmit?: (data: Summary) => void;
    initialData?: Partial<Summary>;
}

const SummaryForm: React.FC<SummaryFormProps> = ({
    onSubmit,
    initialData = {}
}) => {
    const [formData, setFormData] = useState<Summary>({
        content: initialData.content || '',
    });

    const [charCount, setCharCount] = useState(initialData.content?.length || 0);
    const maxChars = 500;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        if (value.length <= maxChars) {
            setFormData({ content: value });
            setCharCount(value.length);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    const handleAISuggestion = () => {
        // Placeholder for AI integration
        console.log('AI suggestion requested');
        // This will connect to your AI service later
    };

    return (
        <form onSubmit={handleSubmit} className="summary-form">
            <div className="form-section">
                <div className="section-header">
                    <h3>Professional Summary</h3>
                    <button
                        type="button"
                        className="ai-button"
                        onClick={handleAISuggestion}
                    >
                        ✨ AI Suggest
                    </button>
                </div>

                <p className="help-text">
                    Write a brief summary that highlights your professional background, key skills,
                    and career objectives. This is your elevator pitch!
                </p>

                <div className="form-group">
                    <label htmlFor="content">Summary *</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Experienced software engineer with 5+ years in full-stack development. Passionate about building scalable web applications and leading cross-functional teams..."
                        rows={8}
                        required
                    />
                    <div className="char-counter">
                        {charCount} / {maxChars} characters
                    </div>
                </div>

                <div className="tips-box">
                    <h4>💡 Tips for a great summary:</h4>
                    <ul>
                        <li>Keep it concise (3-5 sentences)</li>
                        <li>Highlight your most relevant experience</li>
                        <li>Include key achievements or metrics</li>
                        <li>Mention your career goals or aspirations</li>
                        <li>Use action words and avoid clichés</li>
                    </ul>
                </div>
            </div>
        </form>
    );
};

export default SummaryForm;