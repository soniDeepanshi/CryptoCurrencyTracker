const form = document.querySelector('#searchForm');
const res = document.getElementById('resultTable');
const cont = document.getElementById("allContent");

form.addEventListener('submit', (e) => {

    e.preventDefault();

    const cType = form.elements.coinType.value;

    fetchPrice(cType);
});

//to fetch api we use async function

const fetchPrice = async (cType) => {
    const x = await axios.get(`https://api.coinstats.app/public/v1/coins/${cType}?currency=INR`);
    console.log(x.data.coin.price);

    const price = x.data.coin.price;
    const volume = x.data.coin.volume;
    const change = x.data.coin.priceChange1d;
    const name = x.data.coin.name;
    const target = 'INR';
    var col= "green";
    if(change<0){
        col = "red";
    }

    res.innerHTML = `
    <thead class="table-dark">
                            <tr>
                                <th scope="col">Property</th>
                                <th scope="col">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${name}</td>
                                <td id="val">${price} ${target}</td>
                            </tr>
                            <tr>
                                <td>Volume</td>
                                <td id="val">${volume}</td>
                            </tr>
                            <tr>
                                <td>Change (24hrs)</td>
                                <td id="val" style="color:${col};">${change}</td>
                            </tr>
                        </tbody>`


    // upd = setTimeout(() => fetchPrice(cType), 10000);
}