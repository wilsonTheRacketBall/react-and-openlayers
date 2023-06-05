describe('OpenLayersMap', () => {
  it('displays a location name when the user clicks on the map', () => {
    cy.visit('http://localhost:3000');

    // Click somewhere on the map
    cy.get('[data-testid="map"]').click(200, 200);

    // Wait for the popup to appear
    cy.get('.ol-popup').should('be.visible');

    // Assert that the popup contains some text
    cy.get('.ol-popup').should('not.be.empty');
  });
});
