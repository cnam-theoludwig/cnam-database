-- Scénario n°8: Gestion des employés de la compagnie (Hotesse de l'air, pilotes, agent de piste, agents de ticketerie, etc). Savoir qui est le pilote principal/copilote d'un vol, hôtesses de l'air présentes sur un vol, agents de ticketeries/qui s'ocuppe de prendre les valises d'un vol. Pour chaque fonction (job), donner le nombre d'employés qui l'exercent et le salaire moyen, minimum, maximum. Quelles sont les fonctions pour lesquelles travaillent le plus de personnes? => La direction consulte la base de données pour connaître le nombre d'hôtesses de l'air, pilotes et agents de ticketterie. Elle ajuste les effectifs en prévision des périodes de forte affluence. => Un client s'est plaint du comportement d'une hôtesse de l'air durant son vol (AF123), le manager a besoin de retrouver les informations de l'employée pour en discuter.

-- Statistiques par fonction (job)
SELECT job, COUNT(*) AS employee_count,
  -- On divise par 100.0 pour convertir les centimes en euros et obtenir un résultat décimal
  ROUND(AVG(salary_cents_euro_per_month) / 100.0, 2) AS average_salary_euro,

  MIN(salary_cents_euro_per_month) / 100.0 AS min_salary_euro,
  MAX(salary_cents_euro_per_month) / 100.0 AS max_salary_euro
FROM employee
GROUP BY job
ORDER BY employee_count DESC;

-- Contexte : Le manager cherche les hôtesses de l'air du vol '8784'.
SELECT e.first_name, e.last_name, e.job
FROM employee AS e JOIN flight_employee AS fe ON e.id = fe.employee_id
WHERE fe.flight_number = '8784' AND e.job = 'Cabin crew';
