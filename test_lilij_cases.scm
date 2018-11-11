;#test
'1

;#test
(cons '1 (cons '1 '()))

;#test
(eq 'abc 'abc)

;#test
(atom 'abc)

;#test
(atom '((cons a (b))))

;#test
(cons 'a (cons 'b '()))

;#test
(car (cons 'a (cons 'b '())))

;#test
(((lambda (x) (lambda (y) (eq x y))) 'a) 'a)

;#test
(((lambda (x) (lambda (y) (eq x y))) 'a) 'b)

;#test
(((lambda (x) (lambda (y) (eq x y))) '()) '())

;#test
(((lambda (x) (lambda (y) (eq x y))) '()) '())

;#test
(((lambda (x) (lambda (y) (eq x y))) 'a) 'b)

;#test
(((label sum (lambda (m) (lambda (n) [
  cond
  ((eq m '()) n)
  ('t ((sum (cdr m)) (cons (car m) n)))
]))) (quote (1 1 1))) (quote (1 1)))

;#test
(((label map (lambda (f) (lambda (list) [
  cond
  ((eq list '()) '())
  ('t (cons (f (car list)) ((map f) (cdr list))))
]))) (lambda (c) [cons c (cons c (cons c '()))])) (quote (1 1)))

;#test
((label our-member (lambda (obj list) [
  cond
  ((eq list '()) '())
  ((eq (car list) obj) list)
  ('t (our-member obj (cdr list)))
]))
 (quote b)
(quote (a b c))
)
