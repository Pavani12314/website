/**
 * Text Analyzer Script
 * This script analyzes text for character counts, pronouns, prepositions, and indefinite articles.
 */

document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const inputText = document.getElementById('inputText');
    const analysisResults = document.getElementById('analysisResults');
    
    // Listen for button click to analyze text
    analyzeBtn.addEventListener('click', function() {
        const text = inputText.value.trim();
        
        // Check if enough text was provided
        if (countWords(text) < 10000) {
            alert('Please enter a text with at least 10,000 words.');
            return;
        }
        
        // Run analysis functions
        calculateCharacterCounts(text);
        countPronouns(text);
        countPrepositions(text);
        countIndefiniteArticles(text);
        
        // Show results section
        analysisResults.style.display = 'block';
    });
});

/**
 * Calculate character counts in the text
 * @param {string} text - The text to analyze
 */
function calculateCharacterCounts(text) {
    const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
    const wordCount = countWords(text);
    const spaceCount = (text.match(/\s/g) || []).length;
    const newlineCount = (text.match(/\n/g) || []).length;
    const specialCount = (text.match(/[^\w\s]/g) || []).length;
    
    // Update DOM elements with counts
    document.getElementById('letterCount').textContent = letterCount;
    document.getElementById('wordCount').textContent = wordCount;
    document.getElementById('spaceCount').textContent = spaceCount;
    document.getElementById('newlineCount').textContent = newlineCount;
    document.getElementById('specialCount').textContent = specialCount;
}

/**
 * Count words in text
 * @param {string} text - The text to count words in
 * @return {number} The number of words
 */
function countWords(text) {
    return text.split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Count and group pronouns in the text
 * @param {string} text - The text to analyze
 */
function countPronouns(text) {
    const pronouns = {
        'Personal Pronouns': ['i', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves', 'they', 'them', 'their', 'theirs', 'themselves'],
        'Relative Pronouns': ['who', 'whom', 'whose', 'which', 'that'],
        'Demonstrative Pronouns': ['this', 'that', 'these', 'those'],
        'Interrogative Pronouns': ['what', 'which', 'who', 'whom', 'whose'],
        'Indefinite Pronouns': ['anybody', 'anyone', 'anything', 'each', 'either', 'everybody', 'everyone', 'everything', 'neither', 'nobody', 'no one', 'nothing', 'one', 'somebody', 'someone', 'something', 'both', 'few', 'many', 'several', 'all', 'any', 'most', 'none', 'some']
    };
    
    // Tokenize the text
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    // Count pronouns by group
    const pronounCounts = {};
    
    for (const group in pronouns) {
        pronounCounts[group] = {};
        
        pronouns[group].forEach(pronoun => {
            // Count occurrences of each pronoun
            let count = 0;
            for (const word of words) {
                if (word === pronoun) {
                    count++;
                }
            }
            
            // Only add to results if pronoun was found
            if (count > 0) {
                pronounCounts[group][pronoun] = count;
            }
        });
    }
    
    // Display results
    displayCounts('pronounList', pronounCounts);
}

/**
 * Count and group prepositions in the text
 * @param {string} text - The text to analyze
 */
function countPrepositions(text) {
    const prepositions = [
        'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 'around', 'at', 'before', 
        'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'by', 'concerning', 'considering', 
        'despite', 'down', 'during', 'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'near', 
        'of', 'off', 'on', 'onto', 'out', 'outside', 'over', 'past', 'regarding', 'round', 'since', 
        'through', 'throughout', 'to', 'toward', 'towards', 'under', 'underneath', 'until', 'unto', 
        'up', 'upon', 'with', 'within', 'without'
    ];
    
    // Tokenize the text
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    // Count prepositions
    const prepositionCounts = {};
    
    prepositions.forEach(preposition => {
        // Count occurrences of each preposition
        let count = 0;
        for (const word of words) {
            if (word === preposition) {
                count++;
            }
        }
        
        // Only add to results if preposition was found
        if (count > 0) {
            prepositionCounts[preposition] = count;
        }
    });
    
    // Display results
    displayCounts('prepositionList', { 'Prepositions': prepositionCounts });
}

/**
 * Count and group indefinite articles in the text
 * @param {string} text - The text to analyze
 */
function countIndefiniteArticles(text) {
    const indefiniteArticles = ['a', 'an'];
    
    // Tokenize the text
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    // Count indefinite articles
    const articleCounts = {};
    
    indefiniteArticles.forEach(article => {
        // Count occurrences of each article
        let count = 0;
        for (const word of words) {
            if (word === article) {
                count++;
            }
        }
        
        // Only add to results if article was found
        if (count > 0) {
            articleCounts[article] = count;
        }
    });
    
    // Display results
    displayCounts('articleList', { 'Indefinite Articles': articleCounts });
}

/**
 * Display counting results in the DOM
 * @param {string} elementId - The ID of the element to display results in
 * @param {Object} countData - The data to display
 */
function displayCounts(elementId, countData) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    
    // Create HTML to display counts
    for (const group in countData) {
        const groupContainer = document.createElement('div');
        groupContainer.className = 'count-group';
        
        const groupHeading = document.createElement('h4');
        groupHeading.textContent = group;
        groupContainer.appendChild(groupHeading);
        
        const countsList = document.createElement('ul');
        
        // Sort by count (descending)
        const items = Object.entries(countData[group]);
        items.sort((a, b) => b[1] - a[1]);
        
        for (const [item, count] of items) {
            const listItem = document.createElement('li');
            listItem.textContent = `${item}: ${count}`;
            countsList.appendChild(listItem);
        }
        
        groupContainer.appendChild(countsList);
        container.appendChild(groupContainer);
    }
}