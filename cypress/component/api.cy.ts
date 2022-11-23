import specTitle from 'cypress-sonarqube-reporter/specTitle';
import { API } from 'api/lib';
import exampleData from '../fixtures/example.json';

describe(specTitle('@cranium/api'), () => {
  const Api = new API();

  it('should send Request', () => {
    Api.request({ endpoint: '/users', method: 'GET' });

    cy.intercept('GET', '*', (req) => {
      const url = new URL(req.url);
      expect(url.pathname).to.equal('/users');
      expect(req.body).to.be.empty();
      expect(req.headers['content-type']).to.equal(Api.configs.headers['Content-Type']);
      expect(req.method).to.equal('GET');
      req.reply({ statusCode: 200 });
    });
  });

  it('should send GET Request', () => {
    Api.get('/users/12');
    cy.intercept('GET', '*', (req) => {
      const url = new URL(req.url);
      expect(url.pathname).to.equal('/users/12');
      expect(req.body).to.be.empty();
      expect(req.method).to.equal('GET');
      req.reply({ statusCode: 200 });
    });
  });

  it('should send GET Request and build dynamic URL', () => {
    Api.get('/users/:uuid/', { params: { uuid: 'test', key: 12 } });

    cy.intercept('GET', '*', (req) => {
      const url = new URL(req.url);
      expect(url.search).to.equal('?key=12');
      expect(url.pathname).to.equal('/users/test/');
      expect(req.body).to.be.empty();
      expect(req.method).to.equal('GET');
      req.reply({ statusCode: 200 });
    });
  });

  it('should send GET Request and build URL query string', () => {
    Api.get('/users/', { params: { uuid: 'test' } });

    cy.intercept('GET', '*', (req) => {
      const url = new URL(req.url);
      expect(url.pathname).to.equal('/users/');
      expect(url.search).to.equal('?uuid=test');
      expect(req.body).to.be.empty();
      expect(req.method).to.equal('GET');
      req.reply({ statusCode: 200 });
    });
  });

  it('should send GET Request,build dynamic URL, and build URL query string without URL params', () => {
    Api.get('/users/:uuid', { params: { uuid: 'test', age: 12 } });

    cy.intercept('GET', '*', (req) => {
      const url = new URL(req.url);
      expect(url.pathname).to.equal('/users/test');
      expect(url.search).to.equal('?age=12');
      expect(req.body).to.be.empty();
      expect(req.method).to.equal('GET');
      req.reply({ statusCode: 200 });
    });
  });

  it('should send POST Request', () => {
    const data = { name: 'alex' };
    Api.post('/users/', data);
    cy.intercept('POST', '*', (req) => {
      const url = new URL(req.url);
      expect(url.pathname).to.equal('/users/');
      expect(req.body).to.deep.equal(data);
      expect(req.method).to.equal('POST');
      req.reply({ statusCode: 200 });
    });
  });

  it('should send POST Request with not JSON like body', () => {
    Api.post('/users/create', 'some text', { headers: { 'Content-Type': 'text/plain' } });

    cy.intercept('POST', '*', (req) => {
      const url = new URL(req.url);
      expect(url.pathname).to.equal('/users/create');
      expect(req.body).to.equal('some text');
      expect(req.method).to.equal('POST');
      expect(req.headers['content-type']).to.equal('text/plain');
      req.reply({ statusCode: 200 });
    });
  });

  it('should send POST Request and set Content-Type header to multipart/form-data if body has a file', () => {
    Api.post('/file', { file: new File(['foo'], 'foo.txt') });

    cy.intercept('POST', '*', (req) => {
      const url = new URL(req.url);
      expect(url.pathname).to.equal('/file');
      expect(req.method).to.equal('POST');
      expect(req.headers['content-type']).include('multipart/form-data');
      req.reply({ statusCode: 200 });
    });
  });

  it('should send POST Request and set Content-Type header to multipart/form-data if body is FormData', () => {
    Api.post('/file', new FormData());

    cy.intercept('POST', '*', (req) => {
      const url = new URL(req.url);
      expect(url.pathname).to.equal('/file');
      expect(req.method).to.equal('POST');
      expect(req.headers['content-type']).include('multipart/form-data');
      req.reply({ statusCode: 200 });
    });
  });

  it('should send PUT Request', () => {
    Api.put('/users/', { name: 'alex' });

    cy.intercept('PUT', '*', (req) => {
      const url = new URL(req.url);
      expect(url.pathname).to.equal('/users/');
      expect(req.method).to.equal('PUT');
      expect(req.body).to.deep.equal({ name: 'alex' });
      req.reply({ statusCode: 200 });
    });
  });

  it('should send PATCH Request', () => {
    Api.patch('/users/', { name: 'alex' });

    cy.intercept('PATCH', '*', (req) => {
      const url = new URL(req.url);
      expect(url.pathname).to.equal('/users/');
      expect(req.method).to.equal('PATCH');
      expect(req.body).to.deep.equal({ name: 'alex' });
      req.reply({ statusCode: 200 });
    });
  });

  it('should send OPTIONS Request', () => {
    Api.options('/users/');
    cy.intercept('OPTIONS', '*', (req) => {
      const url = new URL(req.url);
      expect(url.pathname).to.equal('/users/');
      expect(req.method).to.equal('OPTIONS');
      req.reply({ statusCode: 200 });
    });
  });

  it('should send DELETE Request', () => {
    Api.delete('/users/:slug', { params: { slug: 'Alex' } });

    cy.intercept('DELETE', '*', (req) => {
      const url = new URL(req.url);
      expect(url.pathname).to.equal('/users/Alex');
      expect(req.method).to.equal('DELETE');
      req.reply({ statusCode: 200 });
    });
  });

  it('should run request insterceptors', () => {
    const removeInterceptor = Api.interceptors.request.use({
      onSuccess: (request) => {
        return {
          ...request,
          method: 'DELETE'
        };
      }
    });
    Api.get('/users/').finally(removeInterceptor);
    cy.intercept('DELETE', '*', (req) => {
      const url = new URL(req.url);
      expect(url.pathname).to.equal('/users/');
      expect(req.method).to.equal('DELETE');
      req.reply({ statusCode: 200 });
    });
    Api.get('/users/').finally(removeInterceptor);
    cy.intercept('GET', '*', (req) => {
      const url = new URL(req.url);
      expect(url.pathname).to.equal('/users/');
      expect(req.method).to.equal('GET');
      req.reply({ statusCode: 200 });
    });
  });

  it('should run responce insterceptors', () => {
    cy.intercept('GET', '/example/', {
      fixture: 'example.json'
    });

    const removeInterceptor1 = Api.interceptors.response.use({
      onSuccess: () => {
        return {
          test1: true
        };
      }
    });

    const removeInterceptor2 = Api.interceptors.response.use({
      onSuccess: () => {
        return {
          test2: true
        };
      }
    });

    Api.get('/example/')
      .then((data) => {
        return expect(data).to.deep.equal({ test2: true });
      })
      .then(() => {
        removeInterceptor2();
        return Api.get('/example/');
      })
      .then((data) => {
        return expect(data).to.deep.equal({ test1: true });
      })
      .then(() => {
        removeInterceptor1();
        return Api.get('/example/');
      })
      .then((data) => {
        return expect(data).to.deep.equal(exampleData);
      });
  });

  it('should run responce Error insterceptors', () => {
    cy.intercept('GET', '/error/', {
      statusCode: 500,
      body: {
        error: 'server error'
      }
    });
    const removeInterceptor = Api.interceptors.response.use({
      onError: () => {
        return { error: 'from interceptor' };
      }
    });
    Api.get('/error/')
      .catch((err) => {
        return expect(err).to.deep.equal({ error: 'from interceptor' });
      })
      .then(() => {
        removeInterceptor();
        return Api.get('/error/');
      })
      .catch((err) => {
        return expect(err).to.deep.equal({ error: 'server error' });
      });
  });

  it('should reject with aborted request data', () => {
    cy.intercept('GET', '/terminate/', {
      fixture: 'example.json'
    });

    const req = Api.get('/terminate/');

    req.catch((err) => {
      expect(err.errors).to.deep.equal({
        code: 20,
        message: "Failed to execute 'fetch' on 'Window': The user aborted a request.",
        name: 'AbortError'
      });
    });
    req.cancel();
  });

  it('should be customisable', () => {
    const Api = new API({
      baseURL: '/api/v2/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer asdadad'
      },

      paramsSerializer: () => 'test=233',
      isMultipartFormData: (body) => Boolean(body ? body.formData : false),
      prepareBody: (body) => {
        const data = new FormData();
        data.append('temp', 'temp_Value');
        return data;
      }
    });

    Api.post('/users/', { formData: 'Alex' }, { params: { uuid: 'test' } });

    cy.intercept('POST', '*', (req) => {
      const url = new URL(req.url);
      expect(url.pathname).to.equal('/api/v2/users/');
      expect(url.search).to.equal('?test=233');
      expect(req.headers['content-type']).include('multipart/form-data');
      expect(req.headers.authorization).to.equal('bearer asdadad');
      expect(req.method).to.equal('POST');

      expect(req.body).include('temp');
      expect(req.body).include('temp_Value');

      req.reply({ statusCode: 200 });
    });
  });
});
