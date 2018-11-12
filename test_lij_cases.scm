;#test
'1

; (quote (((lambda (x) (lambda (y) (eq x y))) 'a) 'a)) '()

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
((lambda (x y) (eq x y)) 'a 'a)

;#test
((lambda (x y) (eq x y)) 'a 'b)

;#test
((lambda (x y) (eq x y)) '() '())

;#test
((lambda (x y) (eq x y)) '() '())

;#test
((label sum (lambda (m n) [
  cond
  ((eq m '()) n)
  ('t (sum (cdr m) (cons (car m) n)))
])) (quote (1 1 1)) (quote (1 1)))

;#test
(((lambda (x) (lambda (y) (eq x y))) 'a) 'b)

;#test
(((label sum (lambda (m) (lambda (n) [
  cond
  ((eq m '()) n)
  ('t ((sum (cdr m)) (cons (car m) n)))
]))) (quote (1 1 1))) (quote (1 1)))

;#test
((label map (lambda (f list) [
  cond
  ((eq list '()) '())
  ('t (cons (f (car list)) (map f (cdr list))))
])) (lambda (c) [cons c (cons c (cons c '()))]) (quote (1 1)))


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
'b
(quote (a b c))
)

;#test
(
(lambda (f list) (f 'a))
((lambda (list)
  (lambda (x) (cons x list))
) (quote (b)))
(quote (c))
)

;#test
((label f (lambda (x) (
  cond
  ((eq x '()) x)
  ('t (cons 1 ))
))) '() (quote (1 1 1 1 1 1 1 1 1 1)))

;#test
((lambda (cons. car. cdr.) 
((label atob (lambda (z) (
  cond
  ((atom z) (cond ((eq z 'a) 'b) ('t z)))
  ('t (cons. (atob (car. z)) (atob (cdr. z))))
))) (cons. 'a (cons. 'b (cons. 'c '())))))
(lambda (x y) (lambda (m) (
  cond
  ((eq m '0) x)
  ((eq m '1) y)
  ('t 'error)
)))
(lambda (z) (z '0))
(lambda (z) (z '1)))

;#test

;#test
(((lambda (Y) (
  Y (lambda (atob) (lambda (z) (
    cond
    ((atom z) (cond ((eq z 'a) 'b) ('t z)))
    ('t (cons (atob (car z)) (atob (cdr z))))
  )))
)) (lambda (f) 
    ((lambda (x) [f (lambda (y) ((x x) y))])
      (lambda (x) [f (lambda (y) ((x x) y))]))))
(quote (a b c (a b c))))

