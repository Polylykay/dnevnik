export function sendQuery(query) {
    const formData = new FormData()
    formData.append('user', 'i21s589');
    formData.append('password', '5rvWZsGT');
    formData.append('database', 'i21s589');
    formData.append('query', query);
    return fetch('https://mysql.students.it-college.ru/sqlpass.php', {
        method: "POST",
        body: formData
    }).then(res =>{
        return res.json()
    })
}
