((label eval. (lambda (exp env) [
(lambda (caar. cadr. cadar. caddr. closure. pair.) [
(lambda (evcon. assoc.) [
  cond
    ((atom exp) (assoc. exp env))
    ((eq (car exp) 'quote) (cadr. exp))
    ((eq (car exp) 'atom) (atom (eval. (cadr. exp) env)))
    ((eq (car exp) 'eq) (eq (eval. (cadr. exp) env) (eval. (caddr. exp) env)))
    ((eq (car exp) 'car) (car (eval. (cadr. exp) env)))
    ((eq (car exp) 'cdr) (cdr (eval. (cadr. exp) env)))
    ((eq (car exp) 'cons) (cons (eval. (cadr. exp) env) (eval. (caddr. exp) env)))
    ((eq (car exp) 'cond) (evcon. (cdr exp) env))
    ((eq (car exp) 'lambda) (closure. exp env))
    ((eq (car exp) 'label) (closure. (caddr. exp) (cons (pair. (cadr. exp) (closure. exp env)) env)))
    ('t ((lambda (v1 v2) [
      cond
        ((eq (car v1) 'closure) [
          cond
          ((eq (car (cadr. v1)) 'lambda)
            (eval. (caddr. (cadr. v1)) 
              (cons (pair. (car (cadr. (cadr. v1))) v2) (caddr. v1))))
          ('t
            (eval. (caddr. (caddr. (cadr. v1))) 
              (cons (pair. (car (cadr. (caddr. (cadr. v1)))) v2)
                (cons (pair. (cadr. (cadr. v1)) v1) (caddr. v1)))))
        ])
        ('t 'error)
    ]) (eval. (car exp) env) (eval. (cadr. exp) env)))
])
(label evcon. (lambda (list env) [
  cond
  ((eq list '()) ())
  ((eval. (caar. list) env) (eval. (cadar. list) env))
  ('t (evcon. (cdr list) env))
]))
(label assoc. (lambda (key env) [
  cond
  ((eq env '()) '())
  ((eq key (caar. env)) (cadar. env))
  ('t (assoc. key (cdr env)))
]))
])
(lambda (x) [car (car x)]) 
(lambda (x) [car (cdr x)]) 
(lambda (x) [car (cdr (car x))]) 
(lambda (x) [car (cdr (cdr x))])
(lambda (exp3 env3) [cons 'closure (cons exp3 (cons env3 '()))])
(lambda (k v) [cons k (cons v '())])
]))
(quote

;#exp

) '())
