/**
 * Test utility functions for Cypress tests
 * Provides shared helper functions for common test patterns like authentication, navigation, and data setup
 */

/**
 * Logs in a user by visiting the login page and entering credentials
 * @param username - The username to log in with
 * @param password - The password to log in with (defaults to 'password123')
 */
export const loginUser = (username: string, password: string = 'securePass123!') => {
  cy.visit('http://localhost:4530');
  cy.contains('Welcome to FakeStackOverflow!');
  cy.get('#username-input').type(username);
  cy.get('#password-input').type(password);
  cy.contains('Submit').click();
  // Wait for redirect to home page
  cy.url().should('include', '/home');
};

/**
 * Seeds the database with test data
 */
export const seedDatabase = () => {
  cy.exec('npx ts-node ../server/seedData/populateDB.ts ' + Cypress.env('MONGODB_URI'));
};

/**
 * Clears the database
 */
export const cleanDatabase = () => {
  cy.exec('npx ts-node ../server/seedData/deleteDB.ts ' + Cypress.env('MONGODB_URI'));
};

/**
 * Sets up the database before each test
 */
export const setupTest = () => {
  cleanDatabase();
  seedDatabase();
};

/**
 * Cleans up the database after each test
 */
export const teardownTest = () => {
  cleanDatabase();
};

/**
 * Navigates to the Ask Question page
 */
export const goToAskQuestion = () => {
  cy.contains('Ask a Question').click();
  cy.url().should('include', '/new/question');
};

/**
 * Creates a new question with the provided details
 * @param title - Question title
 * @param text - Question content
 * @param tags - Space-separated tags
 */
export const createQuestion = (title: string, text: string, tags: string) => {
  goToAskQuestion();
  cy.get('#formTitleInput').type(title);
  cy.get('#formTextInput').type(text);
  cy.get('#formTagInput').type(tags);
  cy.contains('Post Question').click();
};

/**
 * Navigates to answer a specific question by clicking on its title
 * @param questionTitle - The title of the question to click on
 */
export const goToAnswerQuestion = (questionTitle: string) => {
  cy.contains(questionTitle).click();
  cy.contains('Answer Question').click();
  cy.url().should('include', '/new/answer');
};

/**
 * Creates an answer to the current question
 * @param answerText - The answer content
 */
export const createAnswer = (answerText: string) => {
  cy.get('#answerTextInput').type(answerText);
  cy.contains('Post Answer').click();
};

/**
 * Performs a search using the search bar
 * @param searchTerm - The term to search for
 */
export const performSearch = (searchTerm: string) => {
  cy.get('#searchBar').type(`${searchTerm}{enter}`);
};

/**
 * Clicks on a specific filter/order button
 * @param filterName - The name of the filter ("Newest", "Unanswered", "Active", "Most Viewed")
 */
export const clickFilter = (filterName: string) => {
  cy.contains(filterName).click();
};

/**
 * Navigates back to the Questions page
 */
export const goToQuestions = () => {
  cy.contains('Questions').click();
  cy.url().should('include', '/home');
};

/**
 * Waits for questions to load and verifies the page is ready
 */
export const waitForQuestionsToLoad = () => {
  cy.get('.postTitle').should('exist');
};

/**
 * Verifies the order of questions on the page
 * @param expectedTitles - Array of question titles in expected order
 */
export const verifyQuestionOrder = (expectedTitles: string[]) => {
  cy.get('.postTitle').should('have.length', expectedTitles.length);
  cy.get('.postTitle').each(($el, index) => {
    cy.wrap($el).should('contain', expectedTitles[index]);
  });
};

/**
 * Verifies the stats (answers/views) for questions
 * @param expectedAnswers - Array of expected answer counts
 * @param expectedViews - Array of expected view counts
 */
export const verifyQuestionStats = (expectedAnswers: string[], expectedViews: string[]) => {
  cy.get('.postStats').each(($el, index) => {
    if (index < expectedAnswers.length) {
      cy.wrap($el).should('contain', expectedAnswers[index]);
    }
    if (index < expectedViews.length) {
      cy.wrap($el).should('contain', expectedViews[index]);
    }
  });
};

/**
 * Verifies error messages are displayed
 * @param errorMessage - The error message to check for
 */
export const verifyErrorMessage = (errorMessage: string) => {
  cy.contains(errorMessage).should('be.visible');
};

/**
 * Verifies that the question count is displayed correctly
 * @param count - Expected number of questions
 */
export const verifyQuestionCount = (count: number) => {
  cy.get('#question_count').should('contain', `${count} question${count !== 1 ? 's' : ''}`);
};

/**
 * Custom assertion to check that elements contain text in order
 * @param selector - CSS selector for elements
 * @param texts - Array of texts in expected order
 */
export const verifyElementsInOrder = (selector: string, texts: string[]) => {
  cy.get(selector).should('have.length', texts.length);
  texts.forEach((text, index) => {
    cy.get(selector).eq(index).should('contain', text);
  });
};
