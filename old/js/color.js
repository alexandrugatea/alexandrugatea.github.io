if (sessionStorage.getItem('colour')) {
    document.getElementsByTagName('html')[0].style.backgroundColor = sessionStorage.getItem('colour')
} else {
    document.getElementsByTagName('html')[0].style.backgroundColor = '#E80D3A'
    sessionStorage.setItem('colour', "#E80D3A");
}