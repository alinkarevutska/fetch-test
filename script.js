const API = `https://61c9d37520ac1c0017ed8eac.mockapi.io`,
      heroesForm = document.querySelector('#heroesForm'),
      heroesTableBody = document.querySelector('#heroesTable tbody');

let heroNameSurnameInput = heroesForm.querySelector('label input[data-name="heroName"]'),
    comicsSelect = heroesForm.querySelector('select');
    heroFav = heroesForm.querySelector('input[data-name="heroFavourite"]');

// ---------- Promises/then/catch code ----------

// const controller = (path, method=`GET`, obj) => {
//     let options = {
//         method: method,
//         headers: {
//             "Content-type" : "application/json"
//         }
//     }

//     if (obj) {
//         options.body = JSON.stringify(obj);
//     }

//     return fetch(path, options).then(response => response.status >= 200 && response.status <= 400 ? response.json() : Promise.reject(response.status));
// }

// // --------- render existing heroes from database ---------

// renderHero = hero => {
//     let heroRow = document.createElement('tr');
//     heroRow.dataset.id = hero.id;
//     heroRow.innerHTML = `
//     <td>${hero.name}</td>
// 				<td>${hero.comics}</td>
// 				<td>
// 					<label class="heroFavouriteInput">
// 						Favourite: <input type="checkbox" ${hero.favourite ? "checked" : ''}>
// 					</label>
// 				</td>
//     `;
//     heroesTableBody.append(heroRow);

//     let heroesTableFav = heroRow.querySelector(`input`);

//     // --------- editing favourite checkbox status in database  ---------

//     heroesTableFav.addEventListener('change', () => {
//         if (heroesTableFav.checked) {
//             // console.log(`hero has became favourite!`)
//             controller (API + `/heroes/${hero.id}`, `PUT`, {name: hero.name, comics: hero.comics, favourite: true})
//         } else {
//             // console.log(`hero is no longer favourite!`)
//             controller (API + `/heroes/${hero.id}`, `PUT`, {name: hero.name, comics: hero.comics, favourite: false})
//         }
//     })

//     let deleteHeroBtn = document.createElement('button');
//     deleteHeroBtn.innerHTML = `Delete`;
//     heroRow.append(deleteHeroBtn);

//     deleteHeroBtn.addEventListener('click', () => {
//         controller(API + `/heroes/${hero.id}`, `DELETE`);
//         heroRow.remove();
//     });
// }

// controller(API + `/heroes`)
// .then(
//     data => {
//         console.log(`Heroes from the database with heroes:`, data);
//         data.forEach(hero => renderHero(hero));
//     }
// )
// .catch(err => console.log(err))

// // --------- render universes options from database ---------

// const renderUniverses = universe => {
//     let universesOption = document.createElement('option');
//     universesOption.value = `${universe.name}`;
//     universesOption.textContent = `${universe.name}`;
//     comicsSelect.append(universesOption);
// }

// controller(API + `/universes`)
// .then(
//     data => {
//         filteredUniverses = data.filter(universe => universe.id <= 3)
//         console.log(`First 3 universes from database with universes`, filteredUniverses);
//         return filteredUniverses;
//     }
// )
// .then(
//     filteredUniverses => filteredUniverses.forEach(universe => renderUniverses(universe))
// )
// .catch(err => console.log(err))

// // --------- adding hero to database ---------

// heroesForm.addEventListener(`submit`, e => {
//     e.preventDefault();
//     heroNameSurname = heroNameSurnameInput.value;

//     controller(API + `/heroes`, `POST`, {name: heroNameSurname, comics: comicsSelect.value, favourite: heroFav.checked})
//     .then(
//         newHero => {
//             console.log(`User has added a new hero: ${newHero}!🔥🚀`); // object object ????
//             return newHero;
//         }
//     )
//     .then (
//         newHero => renderHero(newHero)
//     )
//     .catch(
//         err => console.log(err)
//     )



/// не работает проверка на существующего пользователя на старом синтаксисе:

    // controller(API + `/heroes`)
    // .then(
    //     data => {
    //         let heroAlreadyExists = data.find(hero => heroNameSurname === hero.name)
    //         return heroAlreadyExists;
    //     }
    // )
    // .then (
    //     heroAlreadyExists => {
    //         if (heroAlreadyExists) {
    //             alert(`Hero already exists. Try to add another hero! 🤔`);
    //             return;
    //         } else {
    //             controller(API + `/heroes`, `POST`, {name: heroNameSurname, comics: comicsSelect.value, favourite: heroFav.checked})
    //         }
    //     }
    // )
    // .then(
    //     newHero => {
    //         console.log(`User has added a new hero: ${newHero}!🔥🚀`);
    //         newHero => renderHero(newHero);
    //     }
    // )
    // .catch(
    //     err => console.log(err)
    // )
// })



// ---------- async/await code ----------

const controller = async (path, method=`GET`, obj) => {
    let options = {
        method: method,
        headers: {
            "Content-type" : "application/json"
        }
    }

    if (obj) {
        options.body = JSON.stringify(obj);
    }

    let request = await fetch(path, options);
    if(request.ok) return request.json()
    else throw Error (request.status);
}

// --------- render existing heroes from database ---------

const renderHero = hero => {
    let heroRow = document.createElement('tr');
    heroRow.dataset.id = hero.id;
    heroRow.innerHTML = `
    <td>${hero.name}</td>
				<td>${hero.comics}</td>
				<td>
					<label class="heroFavouriteInput">
						Favourite: <input type="checkbox" ${hero.favourite ? "checked" : ''}>
					</label>
				</td>
    `;
    heroesTableBody.append(heroRow);

    let heroesTableFav = heroRow.querySelector(`input`);

// --------- editing favourite checkbox status in database  ---------

heroesTableFav.addEventListener('change', () => { controller (API + `/heroes/${hero.id}`, `PUT`, {favourite: heroesTableFav.checked}) })

    // heroesTableFav.addEventListener('change', () => {
    //     if (heroesTableFav.checked) {
    //         controller (API + `/heroes/${hero.id}`, `PUT`, {name: hero.name, comics: hero.comics, favourite: true})
    //     } else {
    //         controller (API + `/heroes/${hero.id}`, `PUT`, {name: hero.name, comics: hero.comics, favourite: false})
    //     }
    // })

    let deleteHeroBtn = document.createElement('button');
    deleteHeroBtn.innerHTML = `Delete`;
    heroRow.append(deleteHeroBtn);

    deleteHeroBtn.addEventListener('click', () => {
        controller(API + `/heroes/${hero.id}`, `DELETE`);
        heroRow.remove();
    });
}

const getHeroes = async () => {
    try {
         let heroArray = await controller(API + `/heroes`);
         console.log(`Heroes from the database with heroes:`, heroArray);
         heroArray.forEach(hero => renderHero(hero));
    } catch(err) {
        console.log(err);
    }
    
}

getHeroes();

// --------- render universes options from database ---------

const renderUniverses = universe => {
    let universesOption = document.createElement('option');
    universesOption.value = `${universe.name}`;
    universesOption.textContent = `${universe.name}`;
    comicsSelect.append(universesOption);
}

const getUniverses = async () => {
    try{
        let universes = await controller(API + `/universes`);
        let filteredUniverses = universes.filter(universe => universe.id <= 3);
        console.log(`First 3 universes from database with universes`, filteredUniverses);
        filteredUniverses.forEach(universe => renderUniverses(universe));

    } catch(err){
        console.log(err)
    }
}

getUniverses();

// --------- adding hero to database ---------

const addHero = async () => {
    try {
    heroNameSurname = heroNameSurnameInput.value;
    let heroes = await controller(API + `/heroes`)
    let heroAlreadyExists = await heroes.find(hero => heroNameSurname === hero.name);
    
    if (heroAlreadyExists) {
        alert(`Hero is already exists. Try to add another hero! 🤔`);
        return;
    } else {
        let newHero = await controller(API + `/heroes`, `POST`, {name: heroNameSurname, comics: comicsSelect.value, favourite: heroFav.checked})
        console.log(`User has added a new hero: ${newHero}!🔥🚀`);   
        renderHero(newHero); 
    }
    } catch (err) {
        console.log(err);
    }
}

heroesForm.addEventListener(`submit`, e => {
    e.preventDefault();
    addHero();
})
