import React, { useState } from 'react';
import "../components/Styling/Builder.scss"

const Builder: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;

    const steps = [
        'Personal Info',
        'Experience',
        'Education',
        'Skills',
        'Preview'
    ];

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="builder-page">
            <div className="builder-header">
                <h1>Build Your Resume</h1>
                <div className="progress-bar">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`step ${currentStep === index + 1 ? 'active' : ''} ${currentStep > index + 1 ? 'completed' : ''}`}
                        >
                            <span className="step-number">{index + 1}</span>
                            <span className="step-label">{step}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="builder-content">
                <div className="form-container">
                    <h2>Step {currentStep}: {steps[currentStep - 1]}</h2>
                    {/* Form components will go here */}
                    <p>Form content for {steps[currentStep - 1]} goes here</p>
                </div>
            </div>

            <div className="builder-footer">
                <button
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="btn-secondary"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentStep === totalSteps}
                    className="btn-primary"
                >
                    {currentStep === totalSteps ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default Builder;