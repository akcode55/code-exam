// Quiz Application JavaScript

class QuizApp {
    constructor() {
        this.currentLanguage = '';
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questions = [];
        this.selectedAnswer = null;
        this.isAnswered = false;
        
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
        // Update final score
        document.getElementById('final-score').textContent = this.score;
        
        // Update results message based on score
        const percentage = (this.score / this.questions.length) * 100;
        let message = '';
        let title = '';
        
        if (percentage >= 90) {
            title = 'Excellent! 🎉';
            message = 'Outstanding performance! You have mastered this language!';
        } else if (percentage >= 70) {
            title = 'Great Job! 👏';
            message = 'Well done! You have a solid understanding of the concepts.';
        } else if (percentage >= 50) {
            title = 'Good Effort! 👍';
            message = 'Not bad! Keep practicing to improve your skills.';
        } else {
            title = 'Keep Learning! 📚';
            message = 'Don\'t give up! Review the concepts and try again.';
        }
        
        document.getElementById('results-title').textContent = title;
        document.getElementById('results-message').textContent = message;
        
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