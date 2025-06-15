// Quiz Application JavaScript

// LocalStorage Manager for persistent data
class LocalStorageManager {
    constructor() {
        this.storageKey = 'quizMasterArena';
        this.initializeStorage();
    }

    initializeStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            const initialData = {
                results: [],
                statistics: {
                    totalQuizzes: 0,
                    totalQuestions: 0,
                    averageScore: 0,
                    bestScore: 0,
                    languageStats: {},
                    recentResults: []
                }
            };
            localStorage.setItem(this.storageKey, JSON.stringify(initialData));
        }
    }

    getData() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey)) || {};
        } catch (error) {
            console.error('Error parsing localStorage data:', error);
            this.initializeStorage();
            return JSON.parse(localStorage.getItem(this.storageKey));
        }
    }

    saveData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    saveQuizResult(result) {
        const data = this.getData();
        
        // Add to results array
        data.results.push(result);
        
        // Update statistics
        this.updateStatistics(data, result);
        
        // Save updated data
        this.saveData(data);
    }

    updateStatistics(data, result) {
        const stats = data.statistics;
        
        // Update totals
        stats.totalQuizzes++;
        stats.totalQuestions += result.totalQuestions;
        
        // Update average score
        const totalScore = data.results.reduce((sum, r) => sum + r.percentage, 0);
        stats.averageScore = Math.round(totalScore / stats.totalQuizzes);
        
        // Update best score
        stats.bestScore = Math.max(stats.bestScore, result.percentage);
        
        // Update language statistics
        if (!stats.languageStats[result.language]) {
            stats.languageStats[result.language] = {
                attempts: 0,
                totalScore: 0,
                averageScore: 0,
                bestScore: 0
            };
        }
        
        const langStats = stats.languageStats[result.language];
        langStats.attempts++;
        langStats.totalScore += result.percentage;
        langStats.averageScore = Math.round(langStats.totalScore / langStats.attempts);
        langStats.bestScore = Math.max(langStats.bestScore, result.percentage);
        
        // Update recent results (keep last 10)
        stats.recentResults.unshift(result);
        if (stats.recentResults.length > 10) {
            stats.recentResults = stats.recentResults.slice(0, 10);
        }
    }

    getStatistics() {
        const data = this.getData();
        return data.statistics || {};
    }

    clearAllData() {
        localStorage.removeItem(this.storageKey);
        this.initializeStorage();
    }
}

class QuizApp {
    constructor() {
        this.currentLanguage = '';
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questions = [];
        this.selectedAnswer = null;
        this.isAnswered = false;
        this.startTime = null;
        
        // Initialize localStorage manager
        this.storage = new LocalStorageManager();
        
        this.initializeApp();
    }
    
    initializeApp() {
        this.bindEvents();
        this.showPage('homepage');
    }
    
    bindEvents() {
        // Language card clicks
        document.querySelectorAll('.language-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const language = e.currentTarget.dataset.language;
                this.startQuiz(language);
            });
        });
        
        // Navigation buttons
        document.getElementById('back-to-home').addEventListener('click', () => {
            this.showPage('homepage');
            this.resetQuiz();
        });
        
        document.getElementById('next-question').addEventListener('click', () => {
            this.nextQuestion();
        });
        
        document.getElementById('try-again').addEventListener('click', () => {
            this.restartQuiz();
        });
        
        document.getElementById('back-to-languages').addEventListener('click', () => {
            this.showPage('homepage');
            this.resetQuiz();
        });
        
        // Statistics page navigation
        document.getElementById('stats-btn').addEventListener('click', () => {
            this.showStatistics();
        });
        
        document.getElementById('back-to-home-from-stats').addEventListener('click', () => {
            this.showPage('homepage');
        });
        
        // Statistics actions
        document.getElementById('clear-stats').addEventListener('click', () => {
            this.clearStatistics();
        });
        
        document.getElementById('export-stats').addEventListener('click', () => {
            this.exportStatistics();
        });
    }
    
    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        document.getElementById(pageId).classList.add('active');
    }
    
    startQuiz(language) {
        this.currentLanguage = language;
        this.questions = [...quizQuestions[language]]; // Create a copy
        this.shuffleQuestions();
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.startTime = Date.now();
        
        // Update quiz title and logo
        document.getElementById('quiz-title').textContent = `${languageNames[language]} Quiz`;
        this.updateQuizLogo(language);
        
        this.showPage('quiz-page');
        this.displayQuestion();
    }
    
    updateQuizLogo(language) {
        const logoContainer = document.getElementById('quiz-logo');
        const languageCard = document.querySelector(`[data-language="${language}"]`);
        const logoSvg = languageCard.querySelector('.card-logo svg');
        
        if (logoSvg) {
            logoContainer.innerHTML = logoSvg.outerHTML;
        }
    }
    
    showCodeExample(question) {
        const codePreview = document.getElementById('code-preview');
        const codeContent = document.getElementById('code-content');
        
        if (question.codeExample) {
            codeContent.textContent = question.codeExample;
            codePreview.style.display = 'block';
            
            // Add syntax highlighting
            this.highlightCode(codeContent, this.currentLanguage);
        } else {
            codePreview.style.display = 'none';
        }
    }
    
    highlightCode(element, language) {
        let code = element.textContent;
        
        // Basic syntax highlighting patterns
        const patterns = {
            javascript: {
                keywords: /\b(const|let|var|function|return|if|else|for|while|class|extends|import|export|async|await|try|catch)\b/g,
                strings: /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g,
                comments: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
                numbers: /\b\d+\.?\d*\b/g
            },
            python: {
                keywords: /\b(def|class|if|else|elif|for|while|import|from|return|try|except|with|as|pass|break|continue|and|or|not|in|is|None|True|False)\b/g,
                strings: /(["'])((?:\\.|(?!\1)[^\\])*?)\1/g,
                comments: /(#.*$)/gm,
                numbers: /\b\d+\.?\d*\b/g
            }
        };
        
        const langPatterns = patterns[language] || patterns.javascript;
        
        // Apply highlighting
        code = code.replace(langPatterns.comments, '<span class="comment">$&</span>');
        code = code.replace(langPatterns.strings, '<span class="string">$&</span>');
        code = code.replace(langPatterns.keywords, '<span class="keyword">$&</span>');
        code = code.replace(langPatterns.numbers, '<span class="number">$&</span>');
        
        element.innerHTML = code;
    }
    
    shuffleQuestions() {
        // Shuffle the questions array for variety
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }
    
    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        this.selectedAnswer = null;
        this.isAnswered = false;
        
        // Update question text
        document.getElementById('question-text').innerHTML = question.question;
        
        // Show code example if available
        this.showCodeExample(question);
        
        // Update progress
        this.updateProgress();
        
        // Create options
        this.createOptions(question);
        
        // Disable next button
        document.getElementById('next-question').disabled = true;
        
        // Update next button text
        const nextBtn = document.getElementById('next-question');
        if (this.currentQuestionIndex === this.questions.length - 1) {
            nextBtn.textContent = 'View Results';
        } else {
            nextBtn.textContent = 'Next Question';
        }
    }
    
    createOptions(question) {
        const container = document.getElementById('options-container');
        container.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.innerHTML = option;
            optionElement.dataset.index = index;
            
            optionElement.addEventListener('click', () => {
                if (!this.isAnswered) {
                    this.selectAnswer(index, optionElement);
                }
            });
            
            container.appendChild(optionElement);
        });
    }
    
    selectAnswer(selectedIndex, selectedElement) {
        if (this.isAnswered) return;
        
        this.selectedAnswer = selectedIndex;
        this.isAnswered = true;
        
        const question = this.questions[this.currentQuestionIndex];
        const options = document.querySelectorAll('.option');
        
        // Remove any previous selections
        options.forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
        });
        
        // Mark the selected answer
        selectedElement.classList.add('selected');
        
        // Show correct/incorrect feedback
        setTimeout(() => {
            options.forEach((option, index) => {
                if (index === question.correct) {
                    option.classList.add('correct');
                } else if (index === selectedIndex && selectedIndex !== question.correct) {
                    option.classList.add('incorrect');
                }
            });
            
            // Update score
            if (selectedIndex === question.correct) {
                this.score++;
                this.showFeedback('Correct!', 'success');
            } else {
                this.showFeedback('Incorrect!', 'error');
            }
            
            // Enable next button
            document.getElementById('next-question').disabled = false;
        }, 300);
    }
    
    showFeedback(message, type) {
        // Create feedback element if it doesn't exist
        let feedback = document.querySelector('.feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'feedback';
            document.querySelector('.question-card').appendChild(feedback);
        }
        
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        feedback.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            font-size: 0.9rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            z-index: 10;
        `;
        
        if (type === 'success') {
            feedback.style.background = 'rgba(34, 197, 94, 0.9)';
        } else {
            feedback.style.background = 'rgba(239, 68, 68, 0.9)';
        }
        
        // Animate in
        setTimeout(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateY(0)';
        }, 100);
        
        // Animate out
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateY(-10px)';
        }, 2000);
    }
    
    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('question-counter').textContent = 
            `${this.currentQuestionIndex + 1} / ${this.questions.length}`;
    }
    
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }
    
    showResults() {
        // Calculate completion time
        const completionTime = Date.now() - this.startTime;
        
        // Update final score
        document.getElementById('final-score').textContent = this.score;
        
        // Update results message based on score
        const percentage = (this.score / this.questions.length) * 100;
        let message = '';
        let title = '';
        
        if (percentage >= 90) {
            title = 'Excellent! 🎉';
            message = 'Outstanding performance! You have mastered this language!';
        } else if (percentage >= 80) {
            title = 'Great Job! 🌟';
            message = 'Excellent work! You have a strong understanding of the concepts.';
        } else if (percentage >= 70) {
            title = 'Well Done! 👏';
            message = 'Good job! You have a solid understanding of the concepts.';
        } else if (percentage >= 50) {
            title = 'Good Effort! 👍';
            message = 'Not bad! Keep practicing to improve your skills.';
        } else {
            title = 'Keep Learning! 📚';
            message = 'Don\'t give up! Review the concepts and try again.';
        }
        
        document.getElementById('results-title').textContent = title;
        document.getElementById('results-message').textContent = message;
        
        // Save results to localStorage
        this.storage.saveQuizResult({
            language: this.currentLanguage,
            score: this.score,
            totalQuestions: this.questions.length,
            percentage: percentage,
            completionTime: completionTime,
            date: new Date().toISOString()
        });
        
        // Show confetti for excellent results (≥80%)
        if (percentage >= 80) {
            this.showConfetti();
        }
        
        // Animate score circle
        this.animateScoreCircle();
        
        this.showPage('results-page');
    }
    
    animateScoreCircle() {
        const circle = document.querySelector('.score-circle');
        const percentage = (this.score / this.questions.length) * 100;
        
        // Create animated border based on score
        let borderColor = '';
        if (percentage >= 70) {
            borderColor = 'rgba(34, 197, 94, 0.8)'; // Green
        } else if (percentage >= 50) {
            borderColor = 'rgba(251, 191, 36, 0.8)'; // Yellow
        } else {
            borderColor = 'rgba(239, 68, 68, 0.8)'; // Red
        }
        
        circle.style.borderColor = borderColor;
        circle.style.animation = 'pulse 2s ease-in-out infinite';
        
        // Add pulse animation to CSS if not exists
        if (!document.querySelector('#pulse-animation')) {
            const style = document.createElement('style');
            style.id = 'pulse-animation';
            style.textContent = `
                @keyframes pulse {
                    0% { transform: scale(1); box-shadow: 0 0 0 0 ${borderColor}; }
                    70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(0,0,0,0); }
                    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,0,0,0); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    showConfetti() {
        // Create multiple confetti bursts for excellent results
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // Create confetti from different positions
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            }));
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            }));
        }, 250);

        // Add celebration sound effect (optional)
        this.playCelebrationSound();
    }

    playCelebrationSound() {
        // Create a simple celebration sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            // Silently fail if audio context is not supported
            console.log('Audio not supported');
        }
    }

    showStatistics() {
        this.updateStatisticsDisplay();
        this.showPage('statistics-page');
    }

    updateStatisticsDisplay() {
        const stats = this.storage.getStatistics();
        
        // Update overall stats with animations
        this.animateNumber('total-quizzes', stats.totalQuizzes);
        this.animateNumber('average-score', stats.averageScore, '%');
        this.animateNumber('best-score', stats.bestScore, '%');
        this.animateNumber('total-questions', stats.totalQuestions);

        // Update language stats
        this.updateLanguageStats(stats.languageStats);
        
        // Update recent results
        this.updateRecentResults(stats.recentResults);
        
        // Update achievements
        this.updateAchievements(stats);
    }

    animateNumber(elementId, targetValue, suffix = '') {
        const element = document.getElementById(elementId);
        const startValue = 0;
        const duration = 1500;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.round(startValue + (targetValue - startValue) * easeOutQuart);
            
            element.textContent = currentValue + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    updateLanguageStats(languageStats) {
        const container = document.getElementById('language-stats-list');
        container.innerHTML = '';

        if (Object.keys(languageStats).length === 0) {
            container.innerHTML = '<p class="no-data">Start taking quizzes to see your language performance!</p>';
            return;
        }

        Object.entries(languageStats).forEach(([language, stats]) => {
            const languageName = languageNames[language] || language;
            const statItem = document.createElement('div');
            statItem.className = 'language-stat-item';
            statItem.innerHTML = `
                <div class="language-stat-header">
                    <span class="language-name">${languageName}</span>
                    <span class="language-best-score">${stats.bestScore}%</span>
                </div>
                <div class="language-stat-details">
                    <span>${stats.attempts} attempts</span>
                    <span>${stats.averageScore}% avg</span>
                </div>
            `;
            container.appendChild(statItem);
        });
    }

    updateRecentResults(recentResults) {
        const container = document.getElementById('recent-results-list');
        container.innerHTML = '';

        if (recentResults.length === 0) {
            container.innerHTML = '<p class="no-data">Take your first quiz to see results here!</p>';
            return;
        }

        recentResults.slice(0, 5).forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'recent-result-item';
            const date = new Date(result.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            });
            const languageName = languageNames[result.language] || result.language;
            
            resultItem.innerHTML = `
                <div class="result-header">
                    <span class="result-language">${languageName}</span>
                    <span class="result-score">${result.score}/${result.totalQuestions}</span>
                </div>
                <div class="result-details">
                    <span class="result-percentage">${result.percentage}%</span>
                    <span class="result-date">${date}</span>
                </div>
            `;
            container.appendChild(resultItem);
        });
    }

    updateAchievements(stats) {
        const container = document.getElementById('achievements-list');
        container.innerHTML = '';

        const achievements = this.calculateAchievements(stats);
        
        if (achievements.length === 0) {
            container.innerHTML = '<p class="no-data">Complete more quizzes to unlock achievements!</p>';
            return;
        }

        achievements.forEach(achievement => {
            const achievementItem = document.createElement('div');
            achievementItem.className = `achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`;
            achievementItem.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <div class="achievement-title">${achievement.title}</div>
                    <div class="achievement-description">${achievement.description}</div>
                </div>
            `;
            container.appendChild(achievementItem);
        });
    }

    calculateAchievements(stats) {
        const achievements = [
            {
                id: 'first_quiz',
                title: 'Getting Started',
                description: 'Complete your first quiz',
                icon: '🎯',
                unlocked: stats.totalQuizzes >= 1
            },
            {
                id: 'perfect_score',
                title: 'Perfect Score',
                description: 'Get 100% on any quiz',
                icon: '💯',
                unlocked: stats.bestScore === 100
            },
            {
                id: 'quiz_master',
                title: 'Quiz Master',
                description: 'Complete 10 quizzes',
                icon: '🏆',
                unlocked: stats.totalQuizzes >= 10
            },
            {
                id: 'consistent_performer',
                title: 'Consistent Performer',
                description: 'Maintain 80%+ average score',
                icon: '⭐',
                unlocked: stats.averageScore >= 80
            },
            {
                id: 'polyglot',
                title: 'Polyglot',
                description: 'Complete quizzes in 5 different languages',
                icon: '🌍',
                unlocked: Object.keys(stats.languageStats).length >= 5
            },
            {
                id: 'speed_demon',
                title: 'Speed Demon',
                description: 'Complete a quiz in under 2 minutes',
                icon: '⚡',
                unlocked: stats.recentResults.some(result => result.completionTime < 120000)
            }
        ];

        return achievements;
    }

    clearStatistics() {
        if (confirm('Are you sure you want to clear all statistics? This action cannot be undone.')) {
            this.storage.clearAllData();
            this.updateStatisticsDisplay();
        }
    }

    exportStatistics() {
        const stats = this.storage.getStatistics();
        const dataStr = JSON.stringify(stats, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `quiz-statistics-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }
    
    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.shuffleQuestions();
        this.showPage('quiz-page');
        this.displayQuestion();
    }
    
    resetQuiz() {
        this.currentLanguage = '';
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questions = [];
        this.selectedAnswer = null;
        this.isAnswered = false;
        
        // Reset progress bar
        document.getElementById('progress-fill').style.width = '0%';
        
        // Remove any feedback elements
        const feedback = document.querySelector('.feedback');
        if (feedback) {
            feedback.remove();
        }
    }
    
    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }
    
    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // Update question text
        document.getElementById('question-text').innerHTML = question.question;
        
        // Update progress
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('question-counter').textContent = 
            `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        
        // Update options
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.innerHTML = option;
            optionElement.addEventListener('click', () => this.selectAnswer(index));
            optionsContainer.appendChild(optionElement);
        });
        
        // Show code example if available
        this.showCodeExample(question);
        
        // Reset state
        this.selectedAnswer = null;
        this.isAnswered = false;
        document.getElementById('next-question').disabled = true;
        
        // Remove any existing feedback
        const feedback = document.querySelector('.feedback');
        if (feedback) {
            feedback.remove();
        }
    }
    
    selectAnswer(answerIndex) {
        if (this.isAnswered) return;
        
        this.selectedAnswer = answerIndex;
        this.isAnswered = true;
        
        const options = document.querySelectorAll('.option');
        const question = this.questions[this.currentQuestionIndex];
        
        // Show correct/incorrect styling
        options.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === answerIndex && index !== question.correct) {
                option.classList.add('incorrect');
            }
            option.style.pointerEvents = 'none';
        });
        
        // Update score
        if (answerIndex === question.correct) {
            this.score++;
            this.showFeedback('Correct! 🎉', 'success');
        } else {
            this.showFeedback('Incorrect 😞', 'error');
        }
        
        // Enable next button
        document.getElementById('next-question').disabled = false;
    }
    
    showFeedback(message, type) {
        // Create feedback element if it doesn't exist
        let feedback = document.querySelector('.feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'feedback';
            document.querySelector('.question-card').appendChild(feedback);
        }
        
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        feedback.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            font-size: 0.9rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            z-index: 10;
        `;
        
        if (type === 'success') {
            feedback.style.background = 'rgba(34, 197, 94, 0.9)';
        } else {
            feedback.style.background = 'rgba(239, 68, 68, 0.9)';
        }
        
        // Animate in
        setTimeout(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateY(0)';
        }, 100);
        
        // Animate out
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateY(-10px)';
        }, 2000);
    }
    
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }
    
    showResults() {
        // Calculate completion time
        const completionTime = Date.now() - this.startTime;
        
        // Update final score
        document.getElementById('final-score').textContent = this.score;
        
        // Update results message based on score
        const percentage = Math.round((this.score / this.questions.length) * 100);
        let message = '';
        let title = '';
        
        if (percentage >= 90) {
            title = 'Excellent! 🎉';
            message = 'Outstanding performance! You have mastered this language!';
        } else if (percentage >= 80) {
            title = 'Great Job! 🌟';
            message = 'Excellent work! You have a strong understanding of the concepts.';
        } else if (percentage >= 70) {
            title = 'Well Done! 👏';
            message = 'Good job! You have a solid understanding of the concepts.';
        } else if (percentage >= 50) {
            title = 'Good Effort! 👍';
            message = 'Not bad! Keep practicing to improve your skills.';
        } else {
            title = 'Keep Learning! 📚';
            message = 'Don\'t give up! Review the concepts and try again.';
        }
        
        document.getElementById('results-title').textContent = title;
        document.getElementById('results-message').textContent = message;
        
        // Save results to localStorage
        this.storage.saveQuizResult({
            language: this.currentLanguage,
            score: this.score,
            totalQuestions: this.questions.length,
            percentage: percentage,
            completionTime: completionTime,
            date: new Date().toISOString()
        });
        
        // Show confetti for excellent results (≥80%)
        if (percentage >= 80) {
            this.showConfetti();
        }
        
        // Animate score circle
        this.animateScoreCircle();
        
        this.showPage('results-page');
    }
    
    showConfetti() {
        // Create multiple confetti bursts for excellent results
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // Create confetti from different positions
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            }));
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            }));
        }, 250);

        // Add celebration sound effect (optional)
        this.playCelebrationSound();
    }

    playCelebrationSound() {
        // Create a simple celebration sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            // Silently fail if audio context is not supported
            console.log('Audio not supported');
        }
    }
    
    animateScoreCircle() {
        const scoreCircle = document.querySelector('.score-circle');
        if (scoreCircle) {
            scoreCircle.style.animation = 'pulse 0.6s ease-in-out';
            
            // Add pulse animation if not already defined
            if (!document.querySelector('#pulse-animation')) {
                const style = document.createElement('style');
                style.id = 'pulse-animation';
                style.textContent = `
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                        100% { transform: scale(1); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }
}

// Enhanced animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the quiz app
    const quizApp = new QuizApp();
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        const currentPage = document.querySelector('.page.active').id;
        
        if (currentPage === 'quiz-page') {
            // Number keys 1-4 for option selection
            if (e.key >= '1' && e.key <= '4') {
                const optionIndex = parseInt(e.key) - 1;
                const options = document.querySelectorAll('.option');
                if (options[optionIndex] && !quizApp.isAnswered) {
                    options[optionIndex].click();
                }
            }
            
            // Enter key for next question
            if (e.key === 'Enter') {
                const nextBtn = document.getElementById('next-question');
                if (!nextBtn.disabled) {
                    nextBtn.click();
                }
            }
        }
        
        // Escape key to go back
        if (e.key === 'Escape') {
            if (currentPage === 'quiz-page') {
                document.getElementById('back-to-home').click();
            } else if (currentPage === 'results-page') {
                document.getElementById('back-to-languages').click();
            }
        }
    });
    
    // Add touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const currentPage = document.querySelector('.page.active').id;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next question (if available)
            if (currentPage === 'quiz-page') {
                const nextBtn = document.getElementById('next-question');
                if (!nextBtn.disabled) {
                    nextBtn.click();
                }
            }
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go back
            if (currentPage === 'quiz-page') {
                document.getElementById('back-to-home').click();
            } else if (currentPage === 'results-page') {
                document.getElementById('back-to-languages').click();
            }
        }
    }
    
    // Add loading animation for better perceived performance
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            loadingScreen.classList.add('hidden');
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000); // Show loading for 2 seconds
    });
    
    // Add focus management for accessibility
    document.addEventListener('focusin', (e) => {
        if (e.target.classList.contains('option')) {
            e.target.style.outline = '2px solid rgba(138, 43, 226, 0.8)';
            e.target.style.outlineOffset = '2px';
        }
    });
    
    document.addEventListener('focusout', (e) => {
        if (e.target.classList.contains('option')) {
            e.target.style.outline = 'none';
        }
    });
});
