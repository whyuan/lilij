(begin
 ((lambda (Y) (
  (lambda (eval. evcon. evlis. assoc cadr caar cadar caddr caddar pair append null.) (
    eval. ((quote (atom (quote abc))) (quote ()))
    ))
  (Y (lambda (eval) (lambda (e a) (
    ))))
  (Y (lambda (evcon) (lambda (c a) (
    cond ((eval. (caar c) a)
      (eval. (cadar c) a))
    ((quote t) (evcon (cdr c) a))
    ))))
  (Y (lambda (evlis) (lambda (m a) (
    cond ((null. m) (quote ()))
    ((quote t) (cons (eval. (car m) a)
      (evlis (cdr m) a)))
    ))))
  (Y (lambda (assoc) (lambda (e a) (
    cond ((eq e (caar a)) (cadar a))
    ((quote t) (assoc e (cdr a)))
    ))))
  (Y (lambda (cadr) (lambda (a) (
    car (cdr a)
    ))))
  (Y (lambda (caar) (lambda (a) (
    car (car a)
    ))))
  (Y (lambda (cadar) (lambda (a) (
    car (cdr (car a))
    ))))
  (Y (lambda (caddr) (lambda (a) (
    car (cdr (cdr a))
    ))))
  (Y (lambda (caddar) (lambda (a) (
    car (cdr (cdr (car a)))
    ))))
  (Y (lambda (pair) (lambda (a b) (
    cons (cons (car a) (cons (car b) (quote ()))) (pair ((cdr a) (cdr b)))
    ))))
  (Y (lambda (append) (lambda (a b) (
    cond ((null. a) b)
    ((quote t) (append ((cdr a) (cons (car a) b))))
    ))))
  (Y (lambda (null.) (lambda (a) (
    (eq a (quote ()))
    ))))
  ) (lambda (f) ((lambda (x) (f (lambda (y) (x (x) (y))))) (lambda (x) (f (lambda (y) (x (x) (y)))))))))
 )


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


