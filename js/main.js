//Use data returned from one api to make a request to another api and display the data returned

document.querySelector('button').addEventListener('click', searchButton)

const ul = document.querySelector('ul')

function searchButton(){
    ul.innerHTML = ''
    const zipCode = document.querySelector('input').value

    fetch(`https://api.zippopotam.us/us/${zipCode}`)
    .then(res => res.json())
    .then(data =>{
        let lat = data.places[0].latitude
        let lon = data.places[0].longitude

        restaurants(lat,lon)
        console.log(data)
    })
    .catch(err => {
        console.error('this' + err)
    });

}

function restaurants(lat,lon){
    fetch(`https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${lat}&longitude=${lon}&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US` ,{
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "travel-advisor.p.rapidapi.com",
		"x-rapidapi-key": "78bc0b3bbemsha30a6d928cc0e75p178194jsna57b91c76816"}
    })
    .then(res => res.json())
    .then(data => {
    for(let i = 0;i < data.data.length;i++){
        if(!data.data[i].ad_position && data.data[i].phone){
        const li = document.createElement('li')
        const span = document.createElement('span')
        ul.append(li)
        li.innerText = `${data.data[i].name} (${data.data[i].phone}): `
        li.append(span)
        span.innerText = `${data.data[i].address}`
        }
    }
    console.log(data.data);
    })
    .catch(err => {
        console.error(err);
    })
}
