describe('API', () => {
  it('1 - Get all posts', () => {

    cy.request({
      method: "GET",
      url: "/posts",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.include('application/json');
      console.log("response.status: " + JSON.stringify(response.headers));
    })
  });

  it('2 - Get only first 10 posts', () => {

    cy.request({
      method: "GET",
      url: "/posts?id=1&id=2&id=3&id=4&id=5&id=6&id=7&id=8&id=9&id=10",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.lengthOf(10)
      console.log(response.body);
    })
  });

  it('3 - Get posts with id = 55 and id = 60', () => {

    cy.request({
      method: "GET",
      url: "/posts?id=55&id=65",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.lengthOf(2);
      expect(response.body[0].id).to.eq(55);
      expect(response.body[1].id).to.eq(65);
      console.log(response.body);
    })
  });

  it('4 - Create a post with status code 401', () => {
    cy.request({
      method: 'POST',
      url: '/664/posts',
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      expect(response.status).to.eq(401);
    })
  })

}) 
