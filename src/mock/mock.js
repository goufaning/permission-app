import Mock from 'mockjs';

Mock.mock('http://localhost:8080/user', {
    'name' : '@name',
    'email' : '@email'

})