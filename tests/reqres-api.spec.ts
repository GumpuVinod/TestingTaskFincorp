import { test, expect, request } from '@playwright/test';

test('Req Operations', async () => {

  // Create API Context
  const apiContext = await request.newContext({

    extraHTTPHeaders: {

      'x-api-key':
      'pro_aa1ad7b0a198bc532ef4179264a402bd08049765a6ca8720043f4a81c131f241',

      'Content-Type': 'application/json'
    }
  });

  // ---------------- CREATE USER ----------------

  const createResponse = await apiContext.post(

    'https://reqres.in/api/collections/users/records?project_id=21005',

    {
      data: {

        data: {

          name: 'Vinod',
          email: 'vinod@gmail.com',
          role: 'QA Engineer'
        }
      }
    }
  );

  // Print Create Response
  console.log('response text:' , await createResponse.text());

  // Validate Create Status
  expect(createResponse.status()).toBe(201);

  // Convert Response into JSON
  const createBody = await createResponse.json();

  console.log('Create Response : ', createBody);

  // Store User ID
  const userId = createBody.data.id;

  console.log('User ID : ', userId);

  // ---------------- GET USER DETAILS ----------------

  const getResponse = await apiContext.get(

    `https://reqres.in/api/collections/users/records/${userId}?project_id=21005`
  );

  // Validate GET Status
  expect(getResponse.status()).toBe(200);

  // Convert GET Response into JSON
  const getBody = await getResponse.json();

  console.log('Get Response : ', getBody);

  // Validate User Details
  expect(getBody.data.data.name).toBe('Vinod');

  expect(getBody.data.data.email).toBe('vinod@gmail.com');

  // ---------------- UPDATE USER ----------------

  const updateResponse = await apiContext.put(

    `https://reqres.in/api/collections/users/records/${userId}?project_id=21005`,

    {
      data: {

        data: {

          name: 'Vinod Kumar',
          email: 'vinod@gmail.com',
          role: 'Senior QA Engineer'
        }
      }
    }
  );

  // Print Update Response
  console.log(await updateResponse.text());

  // Validate Update Status
  expect(updateResponse.status()).toBe(200);

  // Convert Update Response into JSON
  const updateBody = await updateResponse.json();

  console.log('Update Response : ', updateBody);

  // Validate Updated Name
  expect(updateBody.data.data.name).toBe('Vinod Kumar');

});