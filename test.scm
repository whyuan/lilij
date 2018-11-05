; (label f (lambda (p1 ... pn) e))
; ((lambda (p1 ... pn) e) a1 ... an)

'(1)

(cons '1 (cons '1 '()))


(((((lambda (0) (lambda (1) (lambda (add)
  ((label sum (lambda (n)
              ((label f (lambda (step sum)
                         (cond
                                ((eq step n) (add step sum))
                          ('t (f (add step 1) (add step sum)))
                         )
              )) 0 0)
  )) (lambda (f) (lambda (x) (f (f (f x))))))
 )))
 (lambda (f) (lambda (x) x)))
 (lambda (f) (lambda (x) (f x))))
 (lambda (m n f x) (m f (n f x))))
)

((lambda (0) )
 (lambda (f) (lambda (x) x))
)

((let (0 '())
(let (1 (cons '1 '()))
(let (add (lambda (m) (lambda (n) (cons m n))))
 (lambda (n) (label f (lambda (step) (lambda (sum) (
                                                    (cond
                                                     ((eq step n) ((add step) sum))
                                                     ('t ((f ((add step) 1)) ((add step) sum)))
                                                    )
 )))
              ((f 0) 0)
 )

 )
))) (cons '1 '()))

((let (0 '())
  (let (1 (cons '1 '()))
   (let (add (lambda (m) (lambda (n) (cons m n))))
   ))) (cons '1 '()))




((label sum (lambda (m n) (
  cond
  ((eq m '()) n)
  ('t (sum (cdr m) (cons (car m) n)))
))) (cons '1 (cons '1 '())) (cons '1 (cons '1 '())))


(label )

((label add3 (lambda (n1)
  (((label sum (lambda (m) (lambda (n) (
    cond
    ((eq m '()) n1)
    ('t ((sum (cdr m)) (cons (car m) n)))
  )))) (cons '1 (cons '1 (cons '1 '())))) n1)
)) (cons '1 (cons '1 '())))

(((label add3 (lambda (f) (lambda (n) (f n))))
  ((label sum (lambda (m) (lambda (n) (
                                        cond
                                        ((eq m '()) n)
                                        ('t ((sum (cdr m)) (cons (car m) n)))
  )))) (cons '1 (cons '1 (cons '1 '())))))
 (quote (1 1 1 1 1 1))
)

; good
(((label add3 (lambda (f) (lambda (n) (f n))))
  ((label sum (lambda (m) (lambda (n) (
    cond
    ((eq m '()) n)
    ('t ((sum (cdr m)) (cons (car m) n)))
  )))) (cons '1 (cons '1 (cons '1 '())))))
 (cons '1 (cons '1 '()))
)

(((label sum (lambda (m) (lambda (n) (
                                       cond
                                       ((eq m '()) n)
                                       ('t ((sum (cdr m)) (cons (car m) n)))
)))) (quote (1 1 1))) (quote (1 1)))

; good
(((label map (lambda (f) (lambda (list) (
  cond
  ((eq list '()) '())
  ('t (cons (f (car list)) ((map f) (cdr list))))
)))) (lambda (c) (cons c (cons c (cons c '()))))) (quote (1 1)))

(((label map (lambda (f) (lambda (list) (
                                          cond
                                          ((eq list '()) '())
                                          ('t (cons (f (car list)) ((map f) (cdr list))))
)))) (lambda (c) (cons c (cons c (cons c '()))) )) (quote (1 1)))


(((label sum (lambda (m) (lambda (n) (
  cond
  ((eq m '()) n)
  ('t ((sum (cdr m)) (cons (car m) n)))
)))) (cons '1 (cons '1 (cons '1 '())))) (cons '1 (cons '1 '())))

(((label sum (lambda (m) (lambda (n) (
  cond
  ((eq m '()) n)
  ('t ((sum (cdr m)) (cons (car m) n)))
)))) (cons '1 (cons '1 (cons '1 '())))) (cons '1 (cons '1 '())))




(let (0 (lambda (f) (lambda (x) x))) (
(let (1 (lambda (f) (lambda (x) (f x)))) (
(let (add (lambda (m) (lambda (n) (lambda (f) (lambda (x) (m f (n f x))))))) (
                                                                               (let (sum ))
)
))
))



((lambda (0 1 add) ((label sum (lambda (n) ((label f (lambda (step sum) (cond ((eq step n) (add step sum)) ('t (f (add step 1) (add step sum)))))) 0 0))) (lambda (f) (lambda (x) (f (f (f x))))))) (lambda (f) (lambda (x) x)) (lambda (f) (lambda (x) (f x))) (lambda (m n f x) (m f (n f x))))


((lambda (0 1 add) (add 0 1)) (lambda (f) (lambda (x) x)) (lambda (f) (lambda (x) (f x))) (lambda (m n f x) (m f (n f x))))


((lambda (0 1 add)
  (add 0 1)
 )
 (lambda (f) (lambda (x) x))
 (lambda (f) (lambda (x) (f x)))
 (lambda (m n f x) (m f (n f x)))
)

((lambda (0 1 add) (add 0 1)) (lambda (f) (lambda (x) x)) (lambda (f) (lambda (x) (f x))) (lambda (m n f x) (m f (n f x))))

((lambda (0 1 add) (add 0 1)) (lambda (f) (lambda (x) (f x))) (lambda (f) (lambda (x) x)) (lambda (m n f x) (m f (n f x))))

((lambda (m n f x) (m f (n f x)))
 (lambda (f) (lambda (x) x))
 (lambda (f) (lambda (x) (f x))))

((lambda (m n f x) (m f (n f x)))
 (lambda (f x) x)
 (lambda (f x) (f x))
)

(((lambda (m) (lambda (n) (lambda (f) (lambda (x) (m f (n f x))))))
 (lambda (f) (lambda (x) x)))
 (lambda (f) (lambda (x) (f x)))
)

((lambda (m) (lambda (n)) (m f (n f x)))
 (lambda (f x) x)
 (lambda (f x) (f x))
)

((lambda (m n f x) (m f (n f x)))
 (lambda (f x) (f x))
 (lambda (f x) (f (f x)))
)

((lambda (f) (lambda (x) x))
'f
 ((lambda (f) (lambda (x) (f x))) f x)
)
