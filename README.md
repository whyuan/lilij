## Lisp in Lisp in Javascript

参照[《Lisp之根源》](http://daiyuwen.freeshell.org/gb/rol/roots_of_lisp.html)实现的js版lisp和lisp版lisp。

**执行方法**
- node test_lij.js

	使用lij.js，调用test_lij.scm中的案例，并打印结果
	
- node test_lilij.js

	使用lij.js，调用lil.scm，得到lilij解释器，再用lilij调用test_lilij.scm中的案例，并打印结果

**todo**
- 实现js版lisp t
- 实现lisp版lisp t
- 改动态可视域为闭包 t
- 使用y组合子来实现递归 @


