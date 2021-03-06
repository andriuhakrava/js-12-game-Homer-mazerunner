# JS-12-game-Homer-mazerunner

## Educational task from Circle WebAcademy

Дано лабіринт, його представлено у вигляді матриці розмірами 21 х 13:

	```
	var lab = [
	  '111111111111111111111','100010000010001000001','111010111010111011101',
	  '100010101000000000101','101110101010111110111','100000100010100000101',
	  '101111111110101110101','101000100000100010001','111011101110111111111',
	  '100010000010000000001','101111101010111111101','100000001010001000001',
	  '111111111111111111111'
	];
	```

Одиниці - це стіни, нулі - коридори.

У лабіринті довільно розміщується точка початку гри та точка "скарб". Можна створити дві змінні з масивами з двох елементів, що відповідають координатам x та y:

	```
	var start = [5, 3],
	    gold = [7, 11];
	```

Створіть функцію, яка б вибирала довільно один з коридорів лабіринту і заміняла б його на точку початку.

Застосуйте цю ж функцію для заміни нуля на літеру g.

Відмалюйте лабіринт у браузері, використовуючи теги.

Для відображення клітин коридорів чи стін зручно використовувати тег span, для горизонтальних рядків лабіринту - тег p, для всього лабіринту - тег div.

	```
	div { width: 420px; border-left: 1px solid #999; border-top: 1px solid #999;}
	p { margin: 0; font-size: 0; line-height: 0; }
	span { display: inline-block; width: 19px; height: 19px; border-right: 1px solid #999; border-bottom: 1px solid #999;}
	span.start { background: #080;}
	span.wall { background: #999;}
	span.gold { background: #fa0;}

	// приклад маленького лабіринту:
	div
	 p>.wall*5
	 p>.wall+.start+span*2+.wall
	 p>.wall+span+.wall+span+.wall
	 p>.wall+span+.wall+.gold+.wall
	 p>.wall*5
	 ```

Замість кольорів бекграунду можна задати текстуру кам'яної стіни, зображення шукача скарбів та скрині з золотом.

Щоб створити лабіринт по заданій матриці - вам знадобляться деякі нові команди JavaScript.

Створення тегів відбувається за допомогою метода document.createElement, елемент при цьому створюється в пам'яті.

	```
	var span = document.createElement('span');
	var p = document.createElement('p');
	var div = document.createElement('div');
	```

Щоб задати елементу клас - використовується властивість className:

	```
	span.className = 'active';
	p.className = 'first';
	div.className = 'labyrinth';
	```

Щоб добавити один елемент в інший - використовується метод appendChild:

	```
	p.appendChild(span);
	div.appendChild(p);
	document.body.appendChild(div);
	```

Створіть функцію, яка б відмальовувала лабіринт у браузері.

Керувати шукачем скарбів будемо вручну.

Добавте на сторінку 4 кнопки з написами "up", "right", "down", "left" (або фоновими зображеннями стрілок).

До кожної кнопки добавте onclick, перевіряйте, чи можна піти у заданому напрямку, якщо можна, то перемістіться у сусідню клітину.

По досягненні точки зі скарбом виведіть на екран поздоровлення та запустіть гру знову з початку.

Але який же лабіринт без мінотавра? добавте ще одну точку m.

Після кожного ходу гравця мінотавр має зробити свій хід:
рекурсивно переберіть лабіринт (задайте глибину рекурсії 20), знайдіть гравця і по прокладеному маршруту рухайтеся на зустріч йому.
Якщо мінотавр зловить гравця - кінець гри. Почати гру заново.

У випадку гри з мінотавром бажано добавити зациклень у лабіринт, тому що у багатьох випадках мінотавр буде відрізати гравця від скарбів, гру буде пройти неможливо.