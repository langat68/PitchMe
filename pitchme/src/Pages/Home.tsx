import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="home-page">
            <div className="hero-section">
                <h1>Build Your Professional Resume</h1>
                <p>Create a stunning resume in minutes with AI-powered assistance</p>
                <button className="cta-button">Get Started</button>
            </div>

            <div className="features-section">
                <h2>Why Choose Our Resume Builder?</h2>
                <div className="features-grid">
                    <div className="feature">
                        <h3>Professional Templates</h3>
                        <p>Choose from beautifully designed templates</p>
                    </div>
                    <div className="feature">
                        <h3>AI-Powered</h3>
                        <p>Get smart suggestions for your content</p>
                    </div>
                    <div className="feature">
                        <h3>Easy Export</h3>
                        <p>Download as PDF or DOCX instantly</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;