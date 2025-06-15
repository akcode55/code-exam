/* Statistics Page Styles */
.stats-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 30px;
}

.stats-title {
    font-size: 2rem;
    font-weight: 600;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    margin: 0;
}

.stats-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
}

.stats-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 30px;
    color: white;
    transition: all 0.3s ease;
}

.stats-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(138, 43, 226, 0.2);
    background: rgba(255, 255, 255, 0.15);
}

.stats-card h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 20px;
    color: rgba(255, 255, 255, 0.95);
    border-bottom: 2px solid rgba(138, 43, 226, 0.5);
    padding-bottom: 10px;
}

.stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-item:last-child {
    border-bottom: none;
}

.stat-label {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.8);
}

.stat-value {
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(138, 43, 226, 1);
    background: rgba(255, 255, 255, 0.1);
    padding: 4px 12px;
    border-radius: 15px;
}

/* Language Statistics */
.language-stat-item {
    padding: 15px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.language-stat-item:last-child {
    border-bottom: none;
}

.language-stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.language-name {
    font-weight: 600;
    font-size: 1rem;
    color: white;
}

.language-best-score {
    font-weight: 600;
    color: rgba(138, 43, 226, 1);
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.9rem;
}

.language-stat-details {
    display: flex;
    gap: 15px;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
}

/* Recent Results */
.recent-result-item {
    padding: 15px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.recent-result-item:last-child {
    border-bottom: none;
}

.result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.result-language {
    font-weight: 600;
    color: white;
}

.result-score {
    font-weight: 600;
    color: rgba(138, 43, 226, 1);
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.9rem;
}

.result-details {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
}

.result-percentage {
    font-weight: 500;
}

/* Achievements */
.achievements-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
}

.achievement-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.achievement-item.unlocked {
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.3);
}

.achievement-item.locked {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    opacity: 0.6;
}

.achievement-icon {
    font-size: 2rem;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
}

.achievement-item.unlocked .achievement-icon {
    background: rgba(34, 197, 94, 0.2);
}

.achievement-title {
    font-weight: 600;
    color: white;
    margin-bottom: 4px;
}

.achievement-description {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
}

/* Statistics Actions */
.stats-actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 40px;
}

.action-btn.danger {
    background: rgba(239, 68, 68, 0.8);
    border-color: rgba(239, 68, 68, 0.6);
}

.action-btn.danger:hover {
    background: rgba(239, 68, 68, 1);
    transform: translateY(-2px);
}

/* No Data Message */
.no-data {
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-style: italic;
    padding: 20px;
}

/* Enhanced Mobile Responsiveness for Statistics */
@media (max-width: 768px) {
    .stats-header {
        padding: 15px 20px;
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
    
    .stats-title {
        font-size: 1.5rem;
    }
    
    .stats-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .stats-card {
        padding: 20px;
    }
    
    .stats-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .action-btn {
        width: 100%;
        max-width: 300px;
    }
    
    .header-nav {
        position: static;
        margin-bottom: 20px;
    }
    
    .nav-btn {
        padding: 8px 16px;
        font-size: 0.85rem;
    }
    
    .achievement-item {
        padding: 12px;
    }
    
    .achievement-icon {
        font-size: 1.5rem;
        width: 40px;
        height: 40px;
    }
    
    .stat-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
    
    .language-stat-header, .result-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
    
    .language-stat-details, .result-details {
        flex-direction: column;
        gap: 5px;
    }
}

@media (max-width: 480px) {
    .stats-card h3 {
        font-size: 1.1rem;
    }
    
    .stat-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
    
    .language-stat-header, .result-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
    
    .language-stat-details, .result-details {
        flex-direction: column;
        gap: 5px;
    }
}
