// ES5-核心代码
function Base(name) {
	this.age = 4;
	this.name = name;
	this.sayName = function () {
	  console.log('say: ' + this.name);
	}
}

Base.prototype.hello = function() {
	console.log('hello' + this.age);
};

function Son(name, num) {
	Base.call(this, name);
	this.num = num;
}
//注意,这里是new Base()而不是Base.prototype
//因为new Base()是新建了一个对象,这样可以不会影响到Base.prototype，否则我们给子类增加原型方法，同样会影响到父类。
Son.prototype = new Base();
Son.prototype.constructor = Son; 

// 测试代码
let test = new Son('吕肥肥', 100);
console.log(test.__proto__);
console.log(test instanceof Son);
console.log(test instanceof Base);
console.log(test.constructor === Son);
console.log(test.__proto__ === Son.prototype);
console.log(test.sayName());
console.log(test.hello());

console.log('链路测试');
console.log(test.__proto__ === Son.prototype);
console.log(Son.prototype.__proto__ === Base.prototype);
console.log(Base.__proto__ === Function.prototype);
console.log(Function.prototype.__proto__ === Object.prototype);
console.log(Object.prototype.__proto__ === null);


// ES6-核心代码
class A {
	constructor(name) {
		this.name = name;
	}
	run() {
		return this.name;
	}
}
class AA extends A {
	constructor(name, age) {
		super(name);
		this.age = age;
	}
	go() {
		return this.run() + '在跳舞';
	}
}

// 测试代码
let a = new AA('吕芳芳', 12);
console.log(a.go());


