// TODO: load the dataset 
const selectDropDown = document.getElementById('attraction-category');

function filterData(category) {
    let attractions;
    fetch('attractions.json')
	.then(response => response.json())
	.then(data => {
		attractions = data;
		
		if(category == "all") {
			attractions = attractions;
		} else {
			var newAttractions = [];
			for (var i = 0; i < attractions.length; i++) {
				if(attractions[i].Category == category) {
					newAttractions.push(attractions[i]);
				}
			}
			attractions = newAttractions;
		}
		var topFive = [];
		var index = 0;
		var max = 0;
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < attractions.length; j++) {
				if (j == attractions.length-1) {
					topFive.push(attractions[index])
					attractions.splice(index, 1);
					index = 0;
					max = 0;
				} else {
					if(max < attractions[j].Visitors) {
						max = attractions[j].Visitors;
						index = j;
					}
				}
	
			}
		}
	
		renderBarChart(topFive)
	})
};
filterData('all')
selectDropDown.addEventListener('change', (event) => filterData(event.target.value))