---
layout: "post"
title: "Niekonwencjonalność w codzienności"
date: 2026-08-14
author: "Redaktor"
published: true
---

# 1. Wstęp

Praca, którą już opublikowałem, bo mam więcej pomysłów, a nie chcę zalegać z rzeczami, których już nie dokończę.

Ten tekst nie zawiera spójnej narracji, tylko zbitki myśli, które mogą stanowić jakąś całość.  
Wypuszczam go już teraz z powodu tego, że brak jego skończoności powoduje stratę kreatywności w nowych tekstach, a nie mam siły skupiać się na wielu tekstach jednocześnie.  
Jest sporo notacji matematycznej, gdzie używam modeli do wyprowadzania jakiegoś rozumowania. Nie są one dowodzone i wyprowadzone, ale służą jedynie jako próba formulacji myśli,  nie AI psychoza.

**Główna myśl:** myślenie konwencjonalne pomaga w normalnym funkcjonowaniu, jeżeli mamy ustalony cel. Jednak cel, jaki sobie ustanawiamy, jest zazwyczaj nie taki, jaki byśmy chcieli na koniec. Nie prowadzi nas do konkretnego miejsca, ale nadaje kierunek, który jest zazwyczaj zgodny z tym, co chcemy później osiągnąć. Czyli, **Jak wybierać to, co chcemy zrobić?** (nierozwinięte w całości)

Dlaczego taka forma tego postu?
- Ponieważ może niekonwencjonalne połączenie:
    - eseju,
    - wiersza wolnego,
    - anegdot

ma większą wartość, ponieważ wszystkie zmierzają do tego, żeby coś przekazać, a może przekazują to w innym stylu. To tak jak dźwięk i obraz. Opowiadają tę samą historię, ale w innych mediach.

Esej, wiersz wolny, mówione słowo z cyklu koreless, jednak nadal:  
myśl konwencjonalnie, jak Bóg, czyli nie rzucaj kamieniami na szaniec.

![](posts\media\4\1.png)
*Rys. 1 Kamienie na szaniec, film*


To, co się dzieje obecnie w materialistycznej wizji świata, to zrównywanie się z wszechwiedzą i życiem wiecznym, w myśl starożytnych Greków.

Możemy w tym fragmencie zobaczyć, że oni nie traktowali sił nadprzyrodzonych w sposób wyższy od siebie. To był ten sam rodzaj, jakim jesteśmy my: popełniali błędy, nie byli wszechwiedzący i mogli popaść w niełaskę (przykład boga greckiego, który tak zrobił):

**Human, All Too Human 111**
```
The aim of religious worship is to influence nature to human advantage, and hence to instil a subjection to law into her that originally she has not, whereas at present man desires to find out the subjection to law of nature in order to guide himself thereby. 

It brings into prominence the sympathetic relation of man to man, the existence of benevolence, gratitude, prayer, of truces between enemies, of loans upon security, of arrangements for the protection of property. 

Man, even in very inferior degrees of civilization, does not stand in the presence of nature as a helpless slave, he is not willy-nilly the absolute servant of nature. 

In the Greek development of religion, especially in the relationship to the Olympian gods, it becomes possible to entertain the idea of an existence side by side of two castes, a higher, more powerful, and a lower, less powerful: but both are bound together in some way, on account of their origin and are one species. They need not be ashamed of one another. 

This is the element of distinction in Greek religion.
```
W tę myśl: nie będę się wstydzić. Czy to, co jest znane i lubiane przez nas, czyli rutyna, która uspokaja i sprowadza kontrolę nad tym, co się dzieje z naszym życiem, w jakiś sposób opisuje to, co może odczuwać zwykły człowiek?

Według teologii chrześcijańskiej Bóg jest wszechwiedzący i omnipotentny. Dlatego tak jak Viktor w _Arcane_:

>I thought I could bring an end to the world's suffering. But when every equation was solved, all that remained were fields of dreamless solitude. There is no prize to perfection. Only an end to pursuit.

![](posts/media/4/2.png)
*Rys.2 Wiktor, wiktor, arcane*

No, w sumie wyjaśniłeś pracę, odpoczynek i hobby. Nie ma tylko relacji ze światem i ludźmi.

Zna on całą rutynę, nie ma drogi, nie ma celu.
My możemy sobie zadać pytanie:
- dlaczego chcę zrobić wszystko krok po kroku, bez zastanowienia, gdzie w tym jest sens;
- dlaczego spędzam dzień w ten sam sposób co poprzedni, żeby nie mieć potrzeby myślenia nad następnym;
- dlaczego planuję tylko tydzień mojego życia i nie sprawdzam, czy plany się udały;
- dlaczego marzę o tym, co inni, i nie staram się myśleć inaczej;
- dlaczego nie podejmuję akcji, określając wszystkie czynniki (_expected value_).

Ostatnio spotkałem się z krótkim filmem na Instagramie, w którym chiński sportowiec uprawiał kalistenikę. Zainspirowałem się narracją, jaka była w tle jego estetycznego treningu. Wplotę ją w ten tekst, żeby przekazać to, co ma zostać przekazane przez obraz, przez wiersz, przez esej.

> Mija już parę lat,  
> kilka osób jest ze mną, kilka osób dostrzega.
> 
> Niektórzy pytają:  
> dlaczego tak wygląda twoje marzenie?  
> Ale ja nie mam na to odpowiedzi.

Czy wybierając swój charakter, musimy wybierać z tego, co już jest nam dane przez kulturę?

Czy można zrobić _gradient descent_ ze wszystkich cech, jakie są możliwe w ludzkim zachowaniu, i zobaczyć, jak wygląda twój charakter, gdybyś osiągnął wszystko, co chcesz? A co, jeżeli naprawdę nie ma na to odpowiedzi i marzenie jest zlepkiem rzeczy niekontrolowanych przez nas? Może wtedy warto nie zadawać sobie pytań, które przedstawiłem, nie zastanawiać się po co i dlaczego, tylko codziennie kontrolować, jak się czuję.

# 2. Rozwinięcie
## 2.1 Gradient, czyli obecne koło, pismo, zegar, komputer
Ej, zobacz: świat jest jak _matrix multiplication_, przemierzanie gradientu.
![](posts/media/4/3.png)
*Rys. 3 Ontologia normika*
Reguła spadku gradientowego to:  
$$\theta_{t+1}=\theta_{t} - \eta_{t}\nabla L(\theta_{t})$$

Następny stan zależy od tego, co mamy teraz, wraz ze zmianą, która zależy od parametrów eta, nabla L i theta.

Punkt stały tej iteracji spełnia $\nabla L(\theta*)$, więc w minimum aktualizacja znika i układ zamiera.

Mamy szczęście, bo nie każdy szereg czy proces jest zbieżny i można dążyć do celu, a jednak tam nie dotrzeć. W tym wypadku zbieżność gwarantują warunki Robbinsa-Monro na krok uczenia:  
$$
\eta_{t} \to 0, \sum_{t}\eta_{t} = \infty, \sum_{t}\eta^2_{t} < \infty
$$
A warunek drugiego rzędu $\nabla ^2L(\theta) \succeq 0$ mówi, że to naprawdę dołek, a nie przełęcz.  
„Dlatego” osiada na $\eta_{t} \approx 0$.  
Czyli konwergencja to asymptota opadania przy znikającym kroku uczenia.

Możemy jednak w tym wypadku wprowadzić nową siłę. Dlaczego nie zacznę uczyć się stawać na rękach albo robić rzeźby z metalowych prętów? To wszystko. Zrobię to, ponieważ przekroczy moje obecne obeznanie, czyli transgresja. Niestety nie wychodzimy poza kontrolę demiurga, jednak staramy się poszerzyć to, co może istnieć.  
Siła ta ma konkretny kierunek i zwrot, ale to, jak duża jest wypadkowa, zależy od tego, czy trafimy w sam środek, czyli optimum. Z jednej strony, gdy zaczniemy robić niekonwencjonalne rzeczy, to zwariujemy. Niektórych rzeczy nie robi się z dobrych przyczyn.  
Z drugiej, jak zrobimy coś zbyt podobnego, to możemy wrócić bardzo na stare tory, dlatego żeby pokonać siodło, musimy zrobić to mądrze.

## 2.2 Ucieczka z lokalnych minimów
Czekałem na was 10 lat, myślałem, że to już koniec.
[Romilly Waited for 23 Years | Interstellar (2014)](https://www.youtube.com/watch?v=KNx8PktpIcQ)
![](posts/media/4/4.png)
*Rys. 4 To dosłownie Ty, Interstellar*
- czy to jest metoda wyobrażania sobie siebie i kreowania w konkretnym celu?
- czy jeżeli byśmy określili nasze zachowania jako dążące do jakiegoś celu, to możemy oceniać nasze czyny?

Przecież z poprzedniego rozumowania wiemy, że musimy wprowadzić transgresję, która jest siłą ortogonalną w jakimś stopniu do obecnego gradientu.

Formalnie są cztery takie siły: **szum**, **temperatura**, **entropia** lub **zmiana funkcji celu**, aka robienie ruchów brilliant, jak w szachach.

Jednak wymaga to zrozumienia, że pierwszy najlepszy ruch, jaki widzimy, okazuje się tym, który nie jest dobry.

---
## 2.3 Temperatura

W symulowanym wyżarzaniu nowy stan $x'$ wybieramy i przyjmujemy z prawdopodobieństwem danym w kryterium Metropolisa

$$P(x\to x') = min\left( 1,\exp\left( -\frac{\Delta E}{T} \right) \right), \Delta E = E(x') - E(x)$$  
Jeżeli $\Delta E<0$, to ruch poprawia stan i przyjmujemy go zawsze, gdy $\Delta E > 0$, przyjmujemy pogorszenie z prawdopodobieństwem $-\frac{\Delta E}{T}$, malejącym wraz z temperaturą.

To możemy opisać jako formalny model młodości i eksploracji (_który może się kończyć wcześniej albo później, ze skalą i rzędowością w zależności od warunków wychowania. Czy jesteśmy w normie, czy może należymy do jakiejś podgrupy_ - to od razu widać po człowieku, jaka jest jego temperatura w młodości).

Wysoka temperatura to gotowość na ruchy chwilowo nieopłacalne (na przykład zapuszczenie włosów przez faceta).

Jednak tutaj przychodzi mały haczyk: mając taki model, musimy wprowadzić harmonogram chłodzenia $T_{k}=\frac{T_{0}}{\log(1+k)}$, który zapewnia zbieżność do minimum globalnego, a w granicy $T\to 0$ kryterium redukuje się do zachłannego spadku.

Tutaj jednak trzeba bardzo uważać, żeby ten harmonogram chłodzenia był odpowiedni, żeby nie skończyć jak pewien genialny druid.
![266](posts/media/4/5.png)
*Rys. 5 Wszelkie rozmaitości poza domem, ale z bronią..*


---
ZASTANÓW SIĘ
Jeżeli matematyk, który tworzy twierdzenie burzące 80 lat pracy za pomocą własnego intelektu oraz pomocy modelu, ogłosi pracę modelu jako całość w formie niekonwencjonalnego wpisu na X, również zrobił ruch brilliant?  
[levent on X: "hello there the jacobian conjecture is false thanx to my close friend akhil for asking about it and my other close friend fable for working during the world cup final ((1+xy)^3 z + y^2 (1+xy) (4+3xy), y + 3 x (1+xy)^2 z + 3 x y^2 (4+3xy), 2 x - 3 x^2 y - x^3 z): \C^3\to \C^3," / X](https://x.com/__alpoge__/status/2079028340955197566)
![](posts/media/4/6.png)
*Rys. 6 Brak poszanowania pracy matematyków przez wieki, meta-status game - cytat z X*

---
## 2.4 Szum

Drugi natomiast to szum w SGD. Taką aktualizację można zapisać jako dyskretyzację równania stochastycznego:  
$$\theta_{t+1} = \theta_{t}-\eta \nabla L(\theta_{t}) + \sqrt{ \eta}\xi_{t}$$
gdzie $\xi_{t}$ to szum z losowego mini-batcha (zdarzenia).  

Bez tego szumu i żadnego buntu ten post by nie powstał. W końcu jakiś człowiek musiał pomyśleć, że zbuntuje się i zrobi coś, co wydaje się kompletnie nieracjonalne (dosyć patetyczne słowa na zaczęcie publikowania treści w internecie). Chwilowe, częściowo losowe perturbacje mają ważną funkcję. Bez tego określiłbym się wcześniej tym, kim jestem, i zaklinował w jednej formie. Nie daj Boże upupiałbym siebie i całą swoją kreatywność przez całe życie.

Rozkład stacjonarny takiego procesu jest w przybliżeniu $p(\theta) \propto (-\frac{L(\theta)}{T_{eff}})$ z efektywną temperaturą $T_{eff} \propto \frac{\eta}{B}$, czyli stosunkiem kroku uczenia do wielkości batcha.

Ostrość minimum mierzy się największą wartością własną hesjanu $\lambda_{max}(\nabla ^2L)$.

Gdzie ten hesjan mówi nam matematycznie, czy minimum ma dużą krzywiznę. Jeżeli krajobraz szybko się zmienia, to gdy trochę przesuniemy $\theta$, znajdujemy się w innym miejscu.

Czas ucieczki z kotliny rządzi się prawem Arrheniusa. (Arrhenius właśnie brzmi jak kumpel, który uczy się taksonomii wielorybów podczas bycia studentem filozofii w Norwegii).

$\tau \sim \exp\left( \frac{\Delta L}{T_{eff}} \right)$

Więc płaskie minima o małym $\lambda_{max}$ są odporne, a wąskie o dużym \lambda_{max} rozpadają się przy pierwszym wstrząsie.  
Życiowo płaskie minimum to charakter niewrażliwy na zaburzenie warunków. Bycie nieprzewidywalnym to podniesienie $T_{eff}$, żeby nie przeuczyć się do jednego wąskiego rozwiązania.

Zawsze warto coś zmieniać przez dużą wymiarowość. Nie ma jednej cechy. Jako ludzie mamy wiele cech:  
$\theta = (ambicja, towarzyskość, ryzyko, empatia, dyscyplina)$, tych wymiarów jest bardzo dużo.

Żeby jakiś stan był prawdziwym minimum, praktycznie każdy możliwy kierunek zmiany musiałby pogarszać sytuację.

Czyli $\lambda_{1} > 0, \lambda_{2}> 0, \dots, \lambda_{d} > 0$.  
Jeżeli znak każdej wartości byłby w uproszczeniu losowy z prawdopodobieństwem $\frac{1}{2}$, to  
$P(mini\mu m) \approx (\frac{1}{2})^d$, gdzie dla $d = 100$ jest prawdopodobieństwo $P \approx 2^{-100}$, czyli praktycznie zero.
## 2.5 Expected value decyzji codziennych

Wartość oczekiwana pojedynczej decyzji to  
$E[X] = \sum_{i}p_{i}x_{i}$.  
Mamy obecnie dwa tryby, które zbiegają do tego samego.

Bezmyślny dryf nie liczy niczego, naiwna maksymalizacja liczy tylko $\text{arg max}_{a} \hat{\mu}_{a}$, czyli natychmiastową wypłatę. Oba są zachłanne i oba osiadają w minimum lokalnym.

Zachłanny rachunek EV jest tak samo konwencjonalny jak dryf, tylko lepiej ubrany.
Tryb transgresyjny opisuje problem wielorękiego bandyty, reguła UCB wybiera:
$$
a_{t} = \text{arg} \text{ max}_{a}\left( \hat{\mu}_{a}+c\sqrt{\frac{\ln t}{n_{a}}} \right)
$$
gdzie pierwszy człon to eksploatacja znanej średniej, a drugi to premia za niepewność, rosnąca dla działań rzadko próbowanych. Ten drugi człon jest matematyczną postacią ciekawości i daje ograniczenie żalu rzędu $O(\ln t)$. Czysta maksymalizacja EV **ignoruje wartość informacji**.

$$
VOI = E_{info}[max_{a}E[U | a_{i}info]] - max_{a} E[U|a] \geq 0
$$

To ona sprawia, że ruch pozornie nieracjonalny bywa racjonalny, gdy doliczysz to, czego się z niego uczysz.

Do tego dochodzi asymetria wypłat. Dla wypłaty wypukłej f nierówność Jensena daje:

$$
E[f(x)] \geq f(E[X])
$$

A różnica, zwana luką Jensena, rośnie z wariancją $X$. Jeśli ruch niekonwencjonalny ma ograniczoną stratę i nieograniczony zysk, jego funkcja wypłaty jest wypukła, więc niepewność sama w sobie dodaje wartość.

To formalny rdzeń antykruchości i strategii sztangi u Taleba.

Punktowa prognoza EV liczy $f(E[X])$ i systematycznie zaniża $E[f(X)]$, bo liczy średnią zamiast kształtu.

## 2.6 Nieprzewidywalność i ucieczka od rutyny

W uczeniu ze wzmocnieniem stosuje się regularyzację entropii. Cel wzbogaca się o człon entropii polityki:
$$
J(\pi) = \sum_{t}E_{(s_{t},a_{t})}[r(s_{t},a_{t})+\alpha \mathcal{H}(\pi(* | s_{t})), \mathcal{H} =-\sum_{a}\pi(a | s) \log \pi(a | s)
$$

Waga $\alpha$ steruje stochastycznością. Przy $\alpha \to 0$ optymalna polityka staje się deterministyczna, czyli rutynowa. Przy $\alpha > 0$ zostaje losowość, która zapobiega przedwczesnej zbieżności.

To bycie nieprzewidywalnym, żeby nie popaść w rutynę, to człon $\alpha \mathcal{H}(\pi)$, na chłopski rozum.

Mocniejszy i chyba bliższy temu przesłaniu jest novelty search. Zamiast celu optymalizuje się miarę nowości:

$p(x) = \frac{1}{k}\sum_{i = 1}^k dist(x,\mu_{i})$

gdzie $\mu_{i} to k$ najbliższych sąsiadów zachowania $x$ w przestrzeni behawioralnej. Wynik jest zaskakujący. W krajobrazach zwodnicznych optymalizacja samej odmienności bije optymalizację nastawioną na cel.

Poszukiwanie bycia innym, bez ustalonego celu, rozwiązuje zadanie lepiej niż bezpośrednie dążenie do niego.

Pokrewny nurt to **quality-diversity** i **MAP-Elites**, gdzie utrzymuje się archiwum $\mathcal{A}$, różnorodnych dobrych rozwiązań, po jednym najlepszym na komórkę przestrzeni deskryptorów zachowania, zamiast zbiegać do jednego $\theta^{*}$.

To wskazuje na wzorowanie się na wielu ludziach naraz, żeby nie wpaść w obsesję jednej rzeczy.

## 2.7 charakter jako gradient descent

Czy da się zrobić gradient descent po wszystkich cechach? Ma ukryty warunek. Gradientu $\nabla L$ nie ma bez funkcji straty $L$. Odwrotnie, cel można odczytać z zachowań. To inverse reinforcement learning, czyli szukanie takiej nagrody $R$, dla której obserwowana polityka jest optymalna.

## 2.8 Co jeżeli miałbyś maszynę, która rozwiązuje całość problemów podejmowania decyzji

I poznałbyś swój charakter w pełni co do bita informacji, to i tak nie da się tak łatwo zrobić zejścia przez gradient do twojego marzenia/idealnego charakteru.  
Z książki GEB pozwolę sobie pożyczyć styl opowiadania o pomyśle.

![](posts/media/4/7.png)
*Rys 7. Bardzo elegancka grafika, który mi się podoba.*

**Achilles:** Nawet gdyby dało się opisać czyjąś osobowość z bardzo dużą dokładnością, nadal nie oznacza to, że można łatwo wyznaczyć prostą drogę od obecnego charakteru do jakiejś jego idealnej wersji. Gdyby taki proces był trywialny, podobny problem byłby już rozwiązany w przypadku modeli językowych — wystarczyłoby zdefiniować pożądane zasady zachowania, a model zawsze by ich przestrzegał.

**Żółw:** Myślę jednak, że człowiek częściowo tworzy swoją tożsamość właśnie wtedy, gdy odpowiada na pytania, których wcześniej sobie nie zadawał.

**Achilles:** W takim eksperymencie chodziłoby więc nie tylko o poznanie siebie, ale także o system zdolny zrozumieć, do czego dana osoba chce dążyć. Taki system mógłby wskazywać konkretne zmiany prowadzące do tego celu, zamiast dawać ogólne i mało użyteczne rady.

Poznawanie innych działa podobnie. Na podstawie pojedynczej informacji o człowieku tworzymy hipotezy o kolejnych cechach jego życia czy otoczenia. Przykładowo nietypowy szczegół może skłonić nas do przypuszczenia, że jego rodzina również pod pewnymi względami odbiega od normy. Następnie sami odpowiadamy sobie na pytania dotyczące tej osoby, zamiast rzeczywiście jej je zadawać.

W tym sensie istnieje wiele potencjalnych odpowiedzi dotyczących człowieka, które jeszcze nigdy nie zostały przez niego świadomie sformułowane. Są raczej pewnym potencjałem ujawniającym się dopiero po zadaniu odpowiedniego pytania.

Ostateczna idea jest taka, że wystarczająco zaawansowany system mógłby pomagać ludziom lepiej rozumieć siebie i świadomie rozwijać się w kierunku własnych celów, o ile ten rozwój nie odbywałby się kosztem innych. Bez takiego procesu część możliwych wersji człowieka nigdy nie zostaje zrealizowana.

---

W sumie, co szkodzi przeszukiwać inne minima zamiast utwierdzać się w jednym? Jeżeli popatrzy się na problem z innej perspektywy, to odpowiedź staje się jasna.

> wiem, że nie jestem w tym sam,  
> może kiedyś świat nas dostrzeże,  
> jednak może tak nie będzie

Jest wiele rzeczy, których nie znamy. Jednak to, jak bardzo różnimy się od ludzi, jest proste do zobaczenia. Tak jak wspominałem wcześniej, możemy przyjąć prostą analogię nauczyciela i ucznia.

Codziennie uczymy się technicznych rzeczy, ale sam dryf w konkretną stronę jest w jakimś stopniu dziedziczony.

Czy możemy porównywać się do ludzi, do jakich chcemy aspirować, i robić te rzeczy, żeby się do nich upodabniać, a jednocześnie nie do jednej osoby, żeby nie wpaść w obsesję jednej rzeczy?

Tak jak chińscy naukowcy i ludzie renesansu, nie są przedrylowani ich korpusem do nauki, a kreatywnością i ciekawością czasu.

Longing to become a Little Flying Hero, Su Jianlin
[Science Space| Scientific Spaces](https://kexue.fm/)
![](posts/media/4/8.png)
*Rys. 8 Sum ting rite, geniusz za ścianą CPP*

Jak można być bardziej jak oni? Jak można lubić i dostrzegać wartość w kulturze i sztuce w taki sposób jak oni?

No bo na co nam wiedza? Często słyszę, że ma się z wiekiem mądrość życiową. Co to ma znaczyć? Czy obecne rzeczy, jakie są trywialne, a jakie nie były 100 czy 200 lat temu, są obecną mądrością życiową?

Co by powiedziała na to Emily Post, gdy widzę, jak wokół mnie jest ogrom zachowań, które wydają się owocem drzewa nauki.

![](posts/media/4/9.png)
*Rys. 9 nawet za czasów Emily Post, nie uczyli się pisać wszystkimi palcami.*

> ja nadal tutaj będę  
> jest wiele rzeczy, których nie wiem  
> studia, praca, żona, dzieci  
> wszystko z tych rzeczy może się zmienić  
> ale nieważne co, jedna rzecz jest pewna, to nie jest

Byron ma na to odpowiedź.

_Manfred_ (Act I, Scene I)
```
Sorrow is knowledge: they who know the most Must mourn the deepest o'er the fatal truth, The tree of knowledge is not that of life.
```
![](posts/media/4/10.png)
*Rys.10 Czyli jak Friedrich Nietzsche próbuje złapać i dogonić chuda, NEETA, knowledgemaxxera, gdy wspina się na górę nadczłowieka przed polskim patriotą i alpinistą Fryderykiem z domu Nieckim.*

>jak woda, ktora z czasem przebije kamien



# 3. Proces myślowy na temat tego tekstu

## 3.1 Zagadnienie dodatkowe (1)  
**jak można zakodować wszystkie nasze decyzje i zastanowić się nad parametrami, żeby dobrze wybrać, a nie na intuicję. (Nikt normalny tak nie robi, ale dlaczego nie warto spróbować? Kiedyś rozmawiałem z kumplem, któremu opisywałem ten problem, i wspominał, że to dobry pomysł i że w sumie to ma sens)**. Kiedyś próbowałem określać decyzje życiowe, pytając chata, żeby zadawał mi pytania określające parametry ciężkich decyzji, a ja wtedy podawałem, na czym mi zależy, robiąc skalę od 1 do 10.

To nie jest idealne, ale może ten system będzie do jakiegoś miejsca prowadzić.

Zacznijmy od prostszej wersji. Jeżeli mamy pytania tylko „tak” i „nie”, żeby było łatwo to zakodować, jaka jest potrzebna ilość pytań, które nie są jakieś bardzo schematyczne, a raczej określające cel, cechy, przeżycia, żeby opisać człowieka? Z tego, gdy będziemy mieli opis człowieka, można poprosić modele językowe, żeby przeanalizowały te odpowiedzi i zrobiły plan do osiągnięcia celów. Brzmi to jak jakiś kwestionariusz, który rozwiązuje twój typ zwierzęcia duchowego, ale czy nie ma w tym chociażby małego punktu, który jest ciekawy?

No bo patrząc na interakcje ludzi, nie zadaje się pytań wprost, ale odgadujemy i odpowiadamy sobie sami, jaki ktoś jest na podstawie interakcji z nim. Jeżeli skopiować czyjąś opinię o danej osobie, to wydaje się to bardzo ciekawą mapą, jak można reprezentować kogoś w czyjejś pamięci.

## 3.2 Zagadnienie dodatkowe (2)  
Jeżeli zrobi się eksperyment, w którym rozwija się to i mamy kogoś, kto zadaje nam:
- 1 pytanie - w dziedzinie informacji jest to jedna decyzja, która daje nam konkretną ilość bajtów informacji
- 10 pytań - ile bajtów
- 100 pytań - ile bajtów
- 1000 pytań - ile bajtów
- 10 000 pytań - ile bajtów
- 100 000 pytań - ile bajtów
- 1 000 000 pytań - ile bajtów
- 10 000 000 pytań - ile bajtów
- 100 000 000 pytań - ile bajtów
    - na jakim etapie człowiek jest już unikalny w stosunku do wszystkich ludzi
    - od ilu etapów można parować ludzi w społeczność, która chce podobne rzeczy — ludzie sami już to robią nieintuicyjnie, żeby przeżywać swoje życie z bliskimi im osobami, społecznościami czy kulturą.

W końcu byłoby to jakoś zbieżne. Nie wiadomo, czy da się stworzyć tyle tekstu i odpowiedzieć na tyle pytań w ciągu swojego życia.

Czy nie warto robić czegoś takiego przed śmiercią, żeby nie domyślać się z całego dorobku życiowego, kim ktoś był i jakie to było szczęście, że taka osoba była chociażby na chwilę z nami na tym świecie?

Dodatkowo, czy to nie brzmi jak ciekawy benchmark, który opisywałby charakter np. modelu, jeżeli mamy takie pytania?

Tylko jak to zadawać, żeby nie robić benchmaxxingu? W sumie, czy dokładnie tego nie robili w Blade Runnerze, gdzie Ryan Gosling jako officer K po swojej misji musiał odpowiadać i powtarzać konkretne słowa, żeby zobaczyć, czy jego charakter się nie zmienił? Wydaje mi się, że chyba stworzyłem metodę torturowania ludzi, a jak się okazuje, również robotów przyszłości, jak się to mówi, z first principles.

## 3.2.1 Zagadnienie dodatkowe (2 dopisek)  
W sumie można tak opisać wszystko i nieważne, o czym myślisz, z taką ilością informacji jestem w stanie określić pomysł, jaki masz w głowie, do praktycznej identyczności. Jednak to, jakie pytania zadam, jest zależne od tego, jak dobrze potrafię dzielić pojęcia, żeby wykluczać je pół na pół — czy to algorytmicznie ma sens, że najlepsza metoda rozdzielenia czegoś to właśnie drzewo binarne? Inaczej wszystko jest suboptymalne z pytaniami.

## 3.3 Zagadnienie dodatkowe (3)  
Kiedy teksty nie są cringe i jaka jest większa wartość mówiona tekstów.  
Przejście z wartości mówionej przez starożytność i oratorów do tekstów, które pisano później, a teraz znowu powrotu do tego, co jest powiedziane.

## 3.4 Zagadnienie dodatkowe (4)  
Inspiracją do tego tekstu był film, który również próbuje pokazać narrację przy opisywaniu zagadnień matematycznych: [MATH ONLY: Non-Euclidean Therapy for AI Trauma (Analog Archives)](https://www.youtube.com/watch?v=EMJsYBD-dNk)

## 3.5 Zagadnienie dodatkowe (5)  
Taki silnik, który zadaje takie pytania, to obecnie terapeuta, który ma słuchać i zadawać konkretne pytania. To jest dosłownie ich zawód. „No ja mogę się zapytać, ale to jest trudniejsze naprawiać silnik, siedząc za kierownicą”.

## 3.6 Zagadnienie dodatkowe (6)  
Co jeżeli pomimo dobrego wyboru i tak przegrywamy z tym, co chcemy zrobić, przez to, że dajemy zbyt dużą uwagę jednej rzeczy? Można zabrać pomysł z ekonomii — kryterium Kelly’ego, które określa, jaką część kapitału powinniśmy postawić/zainwestować, biorąc pod uwagę:
- prawdopodobieństwo wygranej (u nas, szanse na rozwój)
- potencjalny zysk (jak to się ma względem „wygranej alternatywnej”)
- potencjalną stratę (tylko o czas)  

gdzie dla prostego zakładu mamy  
    
    $$f*=\frac{bp-q}{b}$$
    
, gdzie
- $f*$ to optymalny procent kapitału (czasu/uwagi),
- $p$ to prawdopodobieństwo wygranej,
- $q$ to $1 - p$,
- $b$ to zysk netto względem postawionej kwoty,  

więc jeżeli przewaga/pewność jest mała, powinniśmy postawić mało. Jeżeli nie ma dodatniego expected value, to mamy $f*\leq 0$, czyli niepodejmowanie ryzyka/decyzji.