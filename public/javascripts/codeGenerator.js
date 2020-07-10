let code = '';

function post(path, code, method = 'post') {
    const form = document.createElement('form');
    form.method = method;
    form.path = path;

    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = 'newCode';
    hiddenField.value = code;
    form.appendChild(hiddenField);

    document.body.appendChild(form);
    form.submit();
}

document.querySelector('#newCode').addEventListener('click', () => {

    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 6; i++) {
        code += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    post('/secure', code);
});