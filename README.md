# PC Shop App

## Opis

Aplikacja to prosty sklep w którym można zakupić części do komputera. Można przeglądać asortyment na głównej stronie i dodawać elementy do koszyka.

Wybrane elementy można podejrzeć w koszyku i zobaczyć jak sumuje się ich cena. Można również usuwać elementy z koszyka, lub wyczyścić cały koszyk.

## Instalacja

1. Sklonować repozytorium:
   `git clone link-do-repozytorium`
2. Uruchomić terminal w folderze z projektem
3. Uruchomić komendę: `npm run docker:up` aby uruchomić bazę danych Redis
4. Uruchomić komendę `npm run dev` aby uruchomić aplikację
5. Pod adresem: http://localhost:3000 można odwiedzić aplikację
6. Pod adresem: http://localhost:5540 można odwiedzić Redis Insight

## Konfiguracja Redis Insight

Redis Insight pozwala na bieżąco podglądać co się dzieje w bazie danych.

1. Po uruchomieniu bazy dancyh i aplikacji odwiedzić: http://localhost:5540
2. Zaakceptować niezbędne zgody
3. Wybrać opcję: "_+ Connect existing database_"
4. Wybrać "_Connection Settings_"
5. Ustawić "Host" jako "_redis_" i upewnić się, że port jest równy "6379"
6. Opcjonalnie zmienić nazwę pod "Database alias"
7. Wybrać opcję "Add Redis Database" aby zatwierdzić

Na liście pojawi sie nowa baza danych. Po jej kliknięciu uzyska się dostęp do jej podglądu. Aby zobaczyć zmiany w bazie po ich dokonaniu w aplikacji należy wcisnąc przycisk odświeżania u góry tabelki.
