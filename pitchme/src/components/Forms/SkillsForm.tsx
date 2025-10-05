import React, { useState } from 'react';

interface Skill {
    id: string;
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category: 'technical' | 'soft' | 'language' | 'other';
}

interface SkillsData {
    skills: Skill[];
}

interface SkillsFormProps {
    onSubmit?: (data: SkillsData) => void;
    initialData?: SkillsData;
}

const SkillsForm: React.FC<SkillsFormProps> = ({
    onSubmit,
    initialData
}) => {
    const [skills, setSkills] = useState<Skill[]>(
        initialData?.skills || []
    );
    const [newSkillName, setNewSkillName] = useState('');
    const [newSkillLevel, setNewSkillLevel] = useState<Skill['level']>('intermediate');
    const [newSkillCategory, setNewSkillCategory] = useState<Skill['category']>('technical');

    const handleAddSkill = () => {
        if (newSkillName.trim()) {
            const newSkill: Skill = {
                id: crypto.randomUUID(),
                name: newSkillName.trim(),
                level: newSkillLevel,
                category: newSkillCategory,
            };
            setSkills(prev => [...prev, newSkill]);
            setNewSkillName('');
        }
    };

    const handleRemoveSkill = (id: string) => {
        setSkills(prev => prev.filter(skill => skill.id !== id));
    };

    const handleUpdateSkill = (id: string, field: keyof Skill, value: string) => {
        setSkills(prev => prev.map(skill =>
            skill.id === id ? { ...skill, [field]: value } : skill
        ));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({ skills });
        }
    };

    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<Skill['category'], Skill[]>);

    const getLevelColor = (level: Skill['level']) => {
        const colors = {
            beginner: '#94a3b8',
            intermediate: '#3b82f6',
            advanced: '#8b5cf6',
            expert: '#10b981'
        };
        return colors[level];
    };

    return (
        <form onSubmit={handleSubmit} className="skills-form">
            <div className="form-section">
                <h3>Add Your Skills</h3>

                <div className="add-skill-section">
                    <div className="form-row">
                        <div className="form-group flex-2">
                            <label htmlFor="skillName">Skill Name</label>
                            <input
                                type="text"
                                id="skillName"
                                value={newSkillName}
                                onChange={(e) => setNewSkillName(e.target.value)}
                                placeholder="e.g., JavaScript, Leadership, Spanish"
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="skillCategory">Category</label>
                            <select
                                id="skillCategory"
                                value={newSkillCategory}
                                onChange={(e) => setNewSkillCategory(e.target.value as Skill['category'])}
                            >
                                <option value="technical">Technical</option>
                                <option value="soft">Soft Skills</option>
                                <option value="language">Language</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="skillLevel">Proficiency</label>
                            <select
                                id="skillLevel"
                                value={newSkillLevel}
                                onChange={(e) => setNewSkillLevel(e.target.value as Skill['level'])}
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                                <option value="expert">Expert</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="add-button"
                        onClick={handleAddSkill}
                    >
                        + Add Skill
                    </button>
                </div>
            </div>

            {skills.length > 0 && (
                <div className="skills-display">
                    <h3>Your Skills ({skills.length})</h3>

                    {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                        <div key={category} className="skill-category">
                            <h4 className="category-title">
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                {category === 'technical' && ' Skills'}
                                {category === 'language' && 's'}
                            </h4>

                            <div className="skills-list">
                                {categorySkills.map(skill => (
                                    <div
                                        key={skill.id}
                                        className="skill-item"
                                        style={{ borderLeftColor: getLevelColor(skill.level) }}
                                    >
                                        <div className="skill-content">
                                            <span className="skill-name">{skill.name}</span>
                                            <div className="skill-controls">
                                                <select
                                                    value={skill.level}
                                                    onChange={(e) => handleUpdateSkill(skill.id, 'level', e.target.value)}
                                                    className="skill-level-select"
                                                >
                                                    <option value="beginner">Beginner</option>
                                                    <option value="intermediate">Intermediate</option>
                                                    <option value="advanced">Advanced</option>
                                                    <option value="expert">Expert</option>
                                                </select>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveSkill(skill.id)}
                                                    className="remove-skill-button"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                        <div className="skill-level-bar">
                                            <div
                                                className="skill-level-fill"
                                                style={{
                                                    width: `${skill.level === 'beginner' ? 25 :
                                                            skill.level === 'intermediate' ? 50 :
                                                                skill.level === 'advanced' ? 75 : 100
                                                        }%`,
                                                    backgroundColor: getLevelColor(skill.level)
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {skills.length === 0 && (
                <div className="empty-state">
                    <p>No skills added yet. Start by adding your top skills above!</p>
                </div>
            )}
        </form>
    );
};

export default SkillsForm;