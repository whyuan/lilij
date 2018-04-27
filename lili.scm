(begin
 ((lambda (Y) (lambda (f) ((lambda (x) (f (x(x)))) (lambda (x) (f (x(x))))))))
 (defun eval. (e a)
  (cond
   ((atom e) (assoc. e a))
   ((atom (car e))
    (cond
     ((eq (car e) (quote quote)) (cadr e))
     ((eq (car e) (quote atom))  (atom   (eval. (cadr e) a)))
     ((eq (car e) (quote eq))    (eq     (eval. (cadr e) a)
                           (eval. (caddr e) a)))
     ((eq (car e) (quote car))   (car    (eval. (cadr e) a)))
     ((eq (car e) (quote cdr))   (cdr    (eval. (cadr e) a)))
     ((eq (car e) (quote cons))  (cons   (eval. (cadr e) a)
                           (eval. (caddr e) a)))
     ((eq (car e) (quote cond))  (evcon. (cdr e) a))
     ((quote t) (eval. (cons (assoc. (car e) a)
                 (cdr e))
          a))))
   ((eq (caar e) (quote label))
    (eval. (cons (caddar e) (cdr e))
     (cons (list (cadar e) (car e)) a)))
   ((eq (caar e) (quote lambda))
    (eval. (caddar e)
     (append. (pair. (cadar e) (evlis. (cdr  e) a))
      a)))))

 (defun evcon. (c a)
  (cond ((eval. (caar c) a)
         (eval. (cadar c) a))
   ((quote t) (evcon. (cdr c) a))))

 (defun evlis. (m a)
  (cond ((null. m) (quote ()))
   ((quote t) (cons (eval.  (car m) a)
        (evlis. (cdr m) a)))))
)


