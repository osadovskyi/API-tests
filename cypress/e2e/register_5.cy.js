import register from "../fixtures/register.json"
import { faker } from '@faker-js/faker'

register.email = faker.internet.email();
register.password = faker.internet.password({ length: 11 });

describe('5 - register and create post with adding access token in header', () => {
  it('register', () => {
    let userToken;
    let postId
    cy.request({
      method: 'POST',
      url: '/register',
      body: register,
    }).then(response => {
      expect(response.status).to.eq(201);
      userToken = response.body.accessToken;
      console.log(userToken)
    }).then(() => {
      cy.request({
        method: 'POST',
        url: '/664/posts',
        body: register,
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      }).then(response => {
        expect(response.status).to.eq(201);
        postId = response.body.id;
        expect(response.body.email).to.eq(register.email);

        cy.request({
          method: 'GET',
          url: `/664/posts/${postId}`
        }).then((response) => {
          expect(response.body.id).to.eq(postId);
          expect(response.body.email).to.eq(register.email);

        })
      })

    })
  })

})
