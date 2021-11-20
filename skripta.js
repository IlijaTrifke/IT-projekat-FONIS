window.onload = function() {
	//varijable
	var form = document.getElementById("form");
	var input = document.getElementById("input");
	var btn = document.getElementById("btn");
	var list = document.getElementById("list");	
	var btnClr = document.getElementById("btnClr");	
	var id = 1;
	//listItem
	var liItem = "";
	var todoList = [];

	btn.addEventListener("click", addTodoItem);




	list.addEventListener("click", boxChecked);

	btnClr.addEventListener("click", clearList);

	if(localStorage.length <= 0) {
		btnClr.style.display = "none"; //krije clr button	
		console.log("button");
	}

	//proverava data na local storage-u
	if(localStorage.length > 0) {
		displayList();
	}

	
	//dodaje task u to do listu
	function addTodoItem() {
		if(input.value === "") {
			alert("Unesite stavku!");
		}
		else {
			if(list.style.borderTop === "") {
				console.log("here!")
				list.style.borderTop = "2px solid white";
				btnClr.style.display = "inline";
			}
			var text = input.value;	
			var item = `<li id="li-${id}">${text}<input id="box-${id}" 			class="checkboxes" type="checkbox"></li>`;				
			list.insertAdjacentHTML('beforeend', item);	
			liItem = {item: text, checked: false};
			todoList.push(liItem);		
			id++;
			addToLocalStorage()
			form.reset();
		}
	}

	//ako je čekiran task, pravi se novi text style
	function boxChecked(event) {
		const element = event.target;
		if(element.type === "checkbox") {
			element.parentNode.style.textDecoration = "line-through";
			todoList = JSON.parse(localStorage.getItem("todoList"));
			todoList[element.id.split('-')[1]-1].checked = element.checked.toString();
			localStorage.setItem("todoList", JSON.stringify(todoList));
		}
	}

	//ubacuje podatke u local storage
	function addToLocalStorage() {
		if(typeof(Storage) !== "undefined") {
			localStorage.setItem("todoList", JSON.stringify(todoList));
		}
		else {
			alert("browser doesn't support local storage!");
		}
	}

	//prikazuje sve taskove to do liste
	function displayList() {
		//	list.style.borderTop = "2px solid white"; //ovo sam obrisao da ne bi bilo linije
		todoList = JSON.parse(localStorage.getItem("todoList"));
		todoList.forEach(function(element) {
			console.log(element.item)
			var text = element.item;
			var item = `<li id="li-${id}">${text}<input id="box-${id}" class="checkboxes" type="checkbox"></li>`;
			list.insertAdjacentHTML("beforeend", item);
			//ako je čekiran box, onda ide style
			if(element.checked) {
				var li = document.getElementById("li-"+id);
				li.style.textDecoration = "line-through";
				li.childNodes[1].checked = element.checked;
			}
			id++;
		});
	}

	//brise celu to do listu
	function clearList() {
		todoList = [];
		localStorage.clear();
		list.innerHTML = "";
		btnClr.style.display = "none";
		list.style.borderTop = "";
	}
}