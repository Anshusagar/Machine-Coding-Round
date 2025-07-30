// Typeahead functionality
class Typeahead {
    constructor(containerId, words = []) {
        this.container = document.getElementById(containerId);
        this.trie = new Trie();
        this.suggestions = [];
        this.selectedIndex = -1;

        // Initialize with words
        words.forEach(word => this.trie.insert(word));
        console.log(this.trie);
        this.init();
    }

    init() {
        this.createUI();
        this.bindEvents();
    }

    createUI() {
        this.container.innerHTML = `
            <div class="typeahead-wrapper">
                <input type="text" id="typeahead-input" placeholder="Start typing..." autocomplete="off">
                <div id="suggestions-list" class="suggestions-list"></div>
            </div>
        `;

        this.input = document.getElementById('typeahead-input');
        this.suggestionsList = document.getElementById('suggestions-list');

        // Add styles
        this.addStyles();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .typeahead-wrapper {
                position: relative;
                width: 300px;
                margin: 20px auto;
            }

            #typeahead-input {
                width: 100%;
                padding: 12px;
                border: 2px solid #ddd;
                border-radius: 6px;
                font-size: 16px;
                outline: none;
                transition: border-color 0.3s;
            }

            #typeahead-input:focus {
                border-color: #007bff;
            }

            .suggestions-list {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid #ddd;
                border-top: none;
                border-radius: 0 0 6px 6px;
                max-height: 200px;
                overflow-y: auto;
                z-index: 1000;
                display: none;
            }

            .suggestion-item {
                padding: 10px 12px;
                cursor: pointer;
                border-bottom: 1px solid #f0f0f0;
                transition: background-color 0.2s;
            }

            .suggestion-item:hover,
            .suggestion-item.selected {
                background-color: #f8f9fa;
            }

            .suggestion-item:last-child {
                border-bottom: none;
            }

            .highlight {
                background-color: #fff3cd;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        this.input.addEventListener('input', (e) => {
            this.handleInput(e.target.value);
        });

        this.input.addEventListener('keydown', (e) => {
            this.handleKeydown(e);
        });

        this.input.addEventListener('blur', () => {
            // Delay hiding suggestions to allow for clicks
            setTimeout(() => {
                this.hideSuggestions();
            }, 200);
        });
    }

    handleInput(value) {
        if (value.trim() === '') {
            this.hideSuggestions();
            return;
        }

        this.suggestions = this.trie.getWordsWithPrefix(value.toLowerCase());
        this.selectedIndex = -1;
        this.showSuggestions();
    }

    handleKeydown(e) {
        if (!this.suggestions.length) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, this.suggestions.length - 1);
                this.updateSelection();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
                this.updateSelection();
                break;
            case 'Enter':
                e.preventDefault();
                if (this.selectedIndex >= 0) {
                    this.selectSuggestion(this.suggestions[this.selectedIndex]);
                }
                break;
            case 'Escape':
                this.hideSuggestions();
                break;
        }
    }

    showSuggestions() {
        if (this.suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }

        const inputValue = this.input.value.toLowerCase();
        this.suggestionsList.innerHTML = this.suggestions
            .map((suggestion, index) => {
                const highlightedSuggestion = this.highlightMatch(suggestion, inputValue);
                const selectedClass = index === this.selectedIndex ? 'selected' : '';
                return `<div class="suggestion-item ${selectedClass}" data-index="${index}">${highlightedSuggestion}</div>`;
            })
            .join('');

        this.suggestionsList.style.display = 'block';

        // Add click events to suggestions
        this.suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                this.selectSuggestion(this.suggestions[index]);
            });
        });
    }

    hideSuggestions() {
        this.suggestionsList.style.display = 'none';
        this.selectedIndex = -1;
    }

    updateSelection() {
        this.suggestionsList.querySelectorAll('.suggestion-item').forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });
    }

    selectSuggestion(suggestion) {
        this.input.value = suggestion;
        this.hideSuggestions();
        this.input.focus();
    }

    highlightMatch(suggestion, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return suggestion.replace(regex, '<span class="highlight">$1</span>');
    }

    addWord(word) {
        this.trie.insert(word.toLowerCase());
    }
}

// Initialize the typeahead when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Sample words for demonstration
    const sampleWords = [
        'apple', 'apricot', 'banana', 'blueberry', 'cherry', 'coconut',
        'dragonfruit', 'elderberry', 'fig', 'grape', 'grapefruit', 'guava',
        'honeydew', 'kiwi', 'lemon', 'lime', 'mango', 'melon', 'nectarine',
        'orange', 'papaya', 'peach', 'pear', 'pineapple', 'plum', 'pomegranate',
        'raspberry', 'strawberry', 'tangerine', 'watermelon'
    ];

    const typeahead = new Typeahead('container', sampleWords);

    // Add a button to add new words
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Word';
    addButton.style.cssText = `
        display: block;
        margin: 10px auto;
        padding: 8px 16px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    `;

    addButton.addEventListener('click', () => {
        const newWord = prompt('Enter a new word to add:');
        if (newWord && newWord.trim()) {
            typeahead.addWord(newWord.trim());
            alert(`Added "${newWord.trim()}" to the typeahead!`);
        }
    });

    document.body.insertBefore(addButton, document.getElementById('container'));
});