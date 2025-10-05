import React from 'react';

const Preview: React.FC = () => {
    const handleDownloadPDF = () => {
        console.log('Downloading PDF...');
        // PDF download logic will go here
    };

    const handleDownloadDOCX = () => {
        console.log('Downloading DOCX...');
        // DOCX download logic will go here
    };

    const handleEdit = () => {
        console.log('Going back to edit...');
        // Navigate back to builder
    };

    return (
        <div className="preview-page">
            <div className="preview-header">
                <h1>Preview Your Resume</h1>
                <div className="preview-actions">
                    <button onClick={handleEdit} className="btn-secondary">
                        Edit Resume
                    </button>
                    <button onClick={handleDownloadPDF} className="btn-primary">
                        Download PDF
                    </button>
                    <button onClick={handleDownloadDOCX} className="btn-primary">
                        Download DOCX
                    </button>
                </div>
            </div>

            <div className="preview-container">
                <div className="preview-content">
                    {/* Resume preview will be rendered here */}
                    <div className="resume-preview">
                        <p>Your resume preview will appear here</p>
                        <p>This will show the live preview of your resume as you build it</p>
                    </div>
                </div>
            </div>

            <div className="preview-footer">
                <p>Preview is updated in real-time as you make changes</p>
            </div>
        </div>
    );
};

export default Preview;