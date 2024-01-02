
## _Laboratuvar Raporlama Uygulaması_

Spring, JPA, Maven, React teknolojilerini kullanarak hazırlanmış bir laboratuvar raporlama uygulaması.


## Kullanılan Teknolojiler

>- [Spring]

>- [JPA]

>- [Apache Maven]

>- [Bootstrap]

>- [Lombok]

>- [MYSQL]

>- [React]

>- [Node.js]

>- [Jwt]


## Projenin Düzgün Çalışması için Gerekenler

[ [Java JDK 17] ] - en az kurulu olması gerekmektedir.
[ [MYSQL] ] - kurulması gerekmektedir.
[ [Node.js] ] - kurulması gerekmektedir.
[ [Apache Maven] ] - kurulu olması gerekmektedir

## Proje Kurulumu

Proje kurulumu için gerekli adımları takip ediniz.
Projeyi indirip istediğiniz bir yere yerleştirin.
Mysql Workbenchi açıp "Server" kısımından "Data Import" seçeneğini seçin.
Açılan pencerede Import from Self-Contained seçeneğini seçip "C:\YourPath\ReportSystem\databasesample" içindeki database tablosunu seçin.
"Default Target Schema" kısmında New e basarak "hospitalreport" adlı bir tablo oluşturun ardından Start Import butonuna basarak databasemizi import etmiş olucaz.
Databasemizin backend ile olan bağlantısını sağlayabilmemiz için "C:\YourPath\ReportSystem\backend\reportsystem\src\main\resources" diziinde bulunan "application.properties" dosyasını açıyoruz.
```sh
spring.jpa.hibernate.ddl-auto= update
spring.datasource.url=jdbc:mysql://localhost:3306/hospitalreport
spring.datasource.username=mysql kullanıcı adınız
spring.datasource.password=mysql şifreniz
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.open-in-view=true
spring.main.allow-bean-definition-overriding=true
spring.jpa.defer-datasource-initialization=true
reportsystem.app.secret=secretkey
reportsystem.expires.in=8640000000
spring.servlet.multipart.max-file-size=5MB
```
Kullanıcı adı, şifre ve url'i mizi düzenleyip kaydediyoruz.

JDK, Node,js ve Apache Maven kurulduktan sonra  Başlat + R tuşuna basarak çıkan arama yerine cmd yazıp çalıştırıyoruz.

Açılan konsolda
```sh
cd C:\YourPath\ReportSystem\backend\reportsystem
```
YourPath kısmına indirdiğiniz klasörü koyduğunuz dizini yazıyorsunuz. Ardından
```sh
mvn install
```
komutunu çalıştırarak projenin gereksinimleri indirmesini bekliyoruz. İndirme işlemi tamamlandıktan sonra
```sh
cd C:\YourPath\ReportSystem\backend\reportsystem\target
```
Dizinine geçiyoruz ve projemizin backendini çalıştırmak için aşağıdaki kodu yazıyoruz
```sh
java -jar ReportSystem.jar
```
Backendimizi çalıştırdığımıza göre artık frontendimize geçebiliriz. Yeni bir konsol açıyoruz.
```sh
cd C:\YourPath\ReportSystem\frontend
```
Dizinine giriyoruz. Ve gerekli paketlerin yüklenmesi için aşağıdaki komutu çalıştırıyoruz.
```sh
npm install
```
Gerekli paketlerin yüklenmesi bittikten sonra aşağıdaki komutu çalıştırarak frontendimizi başlatabiliriz.
```sh
npm start
```
## Kullanıcı Adı ve Şifreler
Yönetici Hesabı için
1111111
11111111111
Daha Fazla Rapor Ekleyemeyen Bir Teknisyen için
8456715
35416857496
Geri Kalan Teknisyenler
7458416
48567455612

6578597
34658228680

6584157
65458756945
## Proje Gereksinimleri
- Rapor Tanımı ( Dosya numarası, Hasta Ad ve Soyad, Hasta Kimlik Numarası(TC), Koyulan Tanı Başlığı, Tanı Detayları, Raporun - Verildiği Tarih, Fiziksel Rapora Ait .png/.jpg Formatında Bir Adet Fotoğraf ) +
- Bir rapor yalnızca bir laborant tarafından tanımlanmış olmalı. Bir laborant ise 5 tane rapor tanımlayabilir. ( Ad, Soyad, Hastane Kimlik Numarası(7 Haneli), ) +
- Hasta adı/soyadı, Hasta kimlik numarası, Laborant adı/soyadı bilgileri ile arama yapılabilmeli. Rapor tarihi ile sıralama yapılabilmeli +
- Var olan bir rapor üzerinde değişiklik yapılabilmeli +
- Var olan tüm raporların detayları incelenebilmeli +
- Var olan bir rapor silinebilmeli +

Beklentilerimiz:
- Kod standartlarına uygun yazılım geliştirilmesi +
- Uygulamanın çalıştırılabilir hale getirilmesi için bir IDE kullanılması gerekmemesi+

Bir adım öne çıkayım derseniz:
- Birim test içermesi elbette bir artı olarak değerlendirilir. +
- Kullanıcılar sisteme kullanıcı adı/parola ile giriş yapmalı +
- Bir yetkilendirme mekanizması içermeli. Örneğin standart kullanıcılar kayıt oluşturabilsin ilişkilendirebilsin fakat silemesin. Yönetici tüm eylemleri gerçekleştirebilsin.+

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Spring]: <https://spring.io/>
   [Apache Maven]: <https://maven.apache.org/>
   [React]: <https://react.dev/>
   [Bootstrap]: <https://react-bootstrap.netlify.app/>
   [MYSQL]: <https://mysql.com/>
   [Lombok]: <https://projectlombok.org/>
   [JPA]: <https://spring.io/projects/spring-data-jpa/>
   [Java JDK 17]: <https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html>
   [Intellij IDEA Ultimate]: <https://www.jetbrains.com/idea/> 
   [Node.js]:<https://nodejs.org/en>
   [Jwt]:<https://jwt.io/>