// глобальные переменные
var currentTextInput;
var puzzelArrayData;



//возвращает массив, структура кроссворда
function preparePuzzelArray(){
	var items = [	["г", "е", "п", "а", "р", "д", 0, 0, 0, 0, 0],
					[0, 0, 0, "л", 0, 0, 0, 0, 0, 0, 0],
					[0, "с", 0, "к", 0, 0, 0, 0, 0, 0, 0],
					["у", "т", "к", "о", "н", "о", "с", 0, 0, 0, 0],
					[0, "р", 0, "г", 0, 0, "о", 0, 0, 0, 0],
					[0, "и", 0, "о", 0, 0, "б", 0, 0, 0, 0],
					[0, "ж", 0, "л", 0, 0, "а", 0, 0, 0, 0],
					[0, 0, 0, "ь", 0, 0, "к", "р", "ы", "с", "а"],
					[0, 0, 0, 0, 0, 0, "а", 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				];
	return items;
	}
//загружает кроссворд
function initializeScreen(){
	var puzzelTable = document.getElementById("puzzel");
	puzzelArrayData = preparePuzzelArray();
	// для каждого подмассива
	for ( var i = 0; i < puzzelArrayData.length ; i++ ) {
		// добавляет новый ряд в таблицу
		var row = puzzelTable.insertRow(-1); 
		// все элементы массива - данные
		var rowData = puzzelArrayData[i];
		// для каждого индекса  каждого подмассива
		for(var j = 0 ; j < rowData.length ; j++){
			// вставить каждый элемент в таблицу в качестве td элемента (будет вложен в соответсвующий ряд в конец)
			var cell = row.insertCell(-1);
			// если значение клетки (td элемента) не пустое или не равное 0
			if(rowData[j] != 0){
				// то присвоить ей индекс
				var txtID = String('txt' + '_' + i + '_' + j);
				// и добавить инпут со следующими параметрами
				cell.innerHTML = '<input type="text" class="inputBox" maxlength="1" style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				// иначе закрасить клетку
			}else{
				cell.style.backgroundColor  = "#F5FDB0";
			}
		}
	}
	addHint();
}
//Adds the hint numbers
function addHint(){
	document.getElementById("txt_0_3").placeholder = "1";
	document.getElementById("txt_3_0").placeholder = "2";
	document.getElementById("txt_2_1").placeholder = "3";
	document.getElementById("txt_3_6").placeholder = "4";
	document.getElementById("txt_7_6").placeholder = "5";
	document.getElementById("txt_0_0").placeholder = "6";
}
//Сохраняет идентификатор выбранной ячейки в currentTextInput
function textInputFocus(txtID123){
	currentTextInput = txtID123;
}

//Clear All Button
function clearAllClicked(){
	var puzzelTable = document.getElementById("puzzel");
	puzzelTable.innerHTML = '';
    initializeScreen();
}
//Check button
function checkClicked(){
	let check = false;
	// для каждого подмассива сетки кроссворда
	for ( var i = 0; i < puzzelArrayData.length ; i++ ) {
		// все элементы массива - данные
		var rowData = puzzelArrayData[i];
		// для каждого индекса  каждого подмассива
		for(var j = 0 ; j < rowData.length ; j++){
			// если этот элемент не равен нулю
			if(rowData[j] != 0){
				var selectedInputTextElement = document.getElementById('txt' + '_' + i + '_' + j);
				// обращение ко вложенному массиву
				if(selectedInputTextElement.value != puzzelArrayData[i][j]){
					selectedInputTextElement.style.backgroundColor = 'red';
					if(!check){
						document.getElementById("header").innerText="Пейте его кровь!";
						check = true;
					}
					document.getElementById("funanimals").src="images/badanimals.jpg";
					
				
					
					
				}else{
					selectedInputTextElement.style.backgroundColor = 'white';
					document.getElementById("funanimals").src="images/victory.jpg";
					document.getElementById("header").innerText="Winner! Until next game... ";
			
					
				}
			}
		}		
	}		
}
//Clue Button - кнопка подсказки
function clueClicked(){
	if (currentTextInput != null){
		var temp1 = currentTextInput;
		var token = temp1.split("_");
		// это i, который нам уже знаком
		var row = token[1];
		// а это j, который тоже уже нам знаком
		var column = token[2];
		document.getElementById(temp1).value = puzzelArrayData[row][column];
	}
}
//Solve Button
function solveClicked(){
	if (currentTextInput != null){
		var temp1 = currentTextInput;
		var token = temp1.split("_");
		var row = token[1];
		var column = token[2];
		
		// Print elements on top
		for(d = row; d >= 0; d--){
			if(puzzelArrayData[d][column] != 0){
				document.getElementById('txt' + '_' + d + '_' + column).value = puzzelArrayData[d][column];
				}else break;
		}
		// Print elements on right
		for(i = column; i< puzzelArrayData[row].length; i++){
			if(puzzelArrayData[row][i] != 0){
				document.getElementById('txt' + '_' + row + '_' + i).value = puzzelArrayData[row][i];
				}else break;
		}
		
		// Print elements below
		for(m = row; m< puzzelArrayData.length; m++){
			if(puzzelArrayData[m][column] != 0){
				document.getElementById('txt' + '_' + m + '_' + column).value = puzzelArrayData[m][column];
				}else break;
		}
		// Print elements on left
		for(k = column; k >= 0; k--){
			if(puzzelArrayData[row][k] != 0){
				document.getElementById('txt' + '_' + row + '_' + k).value = puzzelArrayData[row][k];
				}else break;
		}
		// Done!
		
	}
}




	// currentTextInput = ''; удалила из clearAllClicked()