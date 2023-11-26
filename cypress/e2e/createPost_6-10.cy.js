import article from "../fixtures/article.json";
import { ar, faker } from "@faker-js/faker";

article.title = faker.lorem.sentence();
article.body = faker.lorem.paragraph();


describe('Create post', () => {
  it('6 - Create post entity and verify that the entity is created. Verify HTTP response status code. Use JSON in body.', () => {

    
    
    cy.request({
      method: 'POST',
      url: '/posts',
      body: JSON.stringify(article),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).contain(article);

    })
  })
  it('7 - Update non-existing entity. Verify HTTP response status code.', () => {

    cy.request({
      method: 'PUT',
      url: '/posts',
      failOnStatusCode: false,
      body: article,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(404);
    })
  })

  
  it('8 - Create post entity and update the created entity. Verify HTTP response status code and verify that the entity is updated.', () => {

    let postNumber;
    let newArticleBody;
    let updatedBody;

    cy.request({
      method: 'POST',
      url: '/posts',
      body: article,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.body).to.eq(article.body)
      expect(response.body.title).to.eq(article.title)
      postNumber = response.body.id;
      newArticleBody = response.body.body;
    }).then(() => {
      article.body = faker.lorem.paragraph();

      cy.request({
        method: 'PUT',
        url: `/posts/${postNumber}`,
        body: article,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.body).to.eq(article.body)
        updatedBody = response.body.body;
        expect(updatedBody).to.not.eq(newArticleBody)

      })
    })
  })

  it('9 - Delete non-existing post entity. Verify HTTP response status code.', () => {

    cy.request({
      method: 'DELETE',
      url: '/posts',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    })
  })

  it('10 - Create post entity, update the created entity, and delete the entity. Verify HTTP response status code and verify that the entity is deleted.', () => {

    let postNumber;
    let newArticleBody;
    let updatedBody;

    cy.request({
      method: 'POST',
      url: '/posts',
      body: article,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.title).to.eq(article.title)
      expect(response.body.body).to.eq(article.body)
      postNumber = response.body.id;
      updatedBody = response.body.body;
    }).then(() => {
      article.body = faker.lorem.paragraph();

      cy.request({
        method: 'PUT',
        url: `/posts/${postNumber}`,
        body: article,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.body).to.eq(article.body)
        updatedBody = response.body.body;
        expect(updatedBody).to.not.eq(newArticleBody)

      }).then(() => {

        cy.request({
          method: 'DELETE',
          url: `/posts/${postNumber}`,
        }).then((response) => {
          expect(response.status).to.eq(200);
        }).then(() => {

          cy.request({
            method: 'GET',
            url: `/posts/${postNumber}`,
            failOnStatusCode: false,
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          }).then((response) => {
            expect(response.status).to.eq(404);

          })

        })
      })

    })

  })



})