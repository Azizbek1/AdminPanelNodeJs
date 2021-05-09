Assalomu aleykum! 

Node Js Admin Panel O'rnatish ushun qulanma! 



Kamandalari:
npm i sequelize,
npm i sequelize-cli
1) npx sequelize init       - Yangi proyekt qiladi! (Bizga yangi ikkita papka qiladi! "config" va "models", "migrations", )
2) Admin   : npx sequelize model:generate --name  Admin --attributes name:string,email:string,password:string
   Category: npx sequelize model:generate --name  Category --attributes name:string,status:enum
   option  : npx sequelize model:generate --name  Options --attributes option_name:string,option_value:string
   users  : npx sequelize model:generate --name  users --attributes name:string,email:string,mobile:string,gender:enum,adress:text,status:enum
   daySettings  : npx sequelize model:generate --name  daySettings --attributes total_days:integer,status:enum
   book  : npx sequelize model:generate --name  book --attributes name:string,CategoryId:integer,description:text,amount:integer,cover_image:string,author:string,status:enum
   IssieBook  : npx sequelize model:generate --name  book --attributes CategoryId:integer,bookId:integer,userId:integer,days_issued:integer,isuued_date:date,is_returned:enum, retured_date:date,status:enum


   // MIGRATIONS - type:  String(120) qilish kerak, allowNull: bu default tarizda true bo'ladi yani ichida majbur malumot bo'lmasa ham xisoblab ketvuradi!


// createBook(migration ichida) : CategoryId :  references: { model: {  tableName: 'categories' }, key: "id" }

// keyin esa config.json ga kirib mysqlda yangi baza qilish kerak! 
// keyingi kamanda npx sequelize db:migrate  : config jsonga kiradi va mysqlda jadvalarni qiladi!




// ===== Admin panelni to'g'irlash =====
public bilan plugins papkasini publickni ichiga tashlash kerak! 

// Keyin partials qisimlarga bo'lish kerak! 

// Sidebarda to'g'irlab chiqish kerak! 

// Keyin esa headerda Nav footer to'g'irlab chiqish kerak

// Asosiy sahifani qilamiz! -- 

// Keyin esa Category bekendga toyorgarlik qilamiz -- Add Category -routerga kirib categor.js qilamiz linklarini to'girlaymiz, keyin esa dashboardan malumotlarni olib add-categoryga qo'shamiz, keyin sidebardan yo'nalishni ham to'g'irlaymiz,app.js ro'yhatdan o'tqizish kerak bo'ladi! 
// List category qilish kerak - add-categorydagi malumotlarni list-categoryga o'tqizamiz, keyin esa style ulanishda dataTables.bootsrapni to'g'irlash kerak, keyin javascriptlarini ham ko'chirib ulash kerak! 

// Book qilish kerak! ) add-Book
// keyin esa list book 

// issue-book 
// iisue-history  - list categoryni ichidagi malumotni tashlash kerak! 


// return-list - issue -historydan olib tashlash kerak ejs ga


//curencyy-sttings - add- categor dan olamiz ejsga

/day-settings - issue-bookda ko'chiramiz! 



==========  2 qismi ===============

// Validator o'rnatamiz : 
<!-- jquery-validation -->
<script src="../../plugins/jquery-validation/jquery.validate.min.js"></script>

keyin esa formga id beramiz 

========   Category bo'limi   ========
1) routga o'tib shemani ko'chiramiz va bazaga qo'shamiz
2) Flashh message qo'shamiz! app.js ga kiramiz! (express-flash), va express ulimiza keyin header qismida div qilamiz! 
3) Checking Duplicate Category  (Проверка повторяющейся категории)
4) List All category  asyn qilish kerak await orqali barcha malumotlarni chiqaramiz 
5) Edit Category - buttonga link qo'yamiz - /admin/edit-category keyin esa add-category malumotni oli edit-categoryga qo'shamiz
6) Update category data - post method orqali o'zgartiramiz (update_name AND category_id != categoryId)
7) Delete Category - yangi form qilish kerak list -categorida input[hiddin] qilish kerak



========   Book  bo'limi   ========
1) oruterga kirib Get routerni to'g'irlaymiz yani Categoriyani ulaymiz bookga
2) Post methodini to'g'irlaymiz va express-fileupload yani rasim ko'chirish uchun uni app.js ulaymiz! 
3) cover_images to'g'irlaymiz yani validate qilamiz faqat png jpg jpeg kiradigan qilamiz! 
4) List Book chiqarishimiz Kerak!  (models papkasida book faylida     book.belongsTo(models.category) deb yozish kerak!!    // define association here qismida!!!)
keyin list-book saxifasida to'g'irlab chiqish kerak! Rasimni va boshqalarini! 
5)  update qilamiz u uchun edit-book qilamiz,  list - bookda u yerda edit sahifasiga yuboramiz va post orqali o'zgartirish kiritamiz! 
6) Delete book yani o'chiramiz! List -bookda Deleta sahifasini qilib o'chiramiz! 



========= User bo'limi =======
1) user.js formga post orqali qo'shamiz va validate ham qo'shamiz 
2) Email adress Существование , takrorlanishini to'g'irlash kerak
3) List user chiqarishimiz kerak, list-userda :    <tbody> deb yozamiz 
                                                         <% users.foreEach(function name(params) { %>
                                                            
                                                         <% }) %>
                                                    </tbody> 

4) Edit user routerda va list userda  to'girlaymiz - adminga add-userdan olib edit-userga tashlaymiz 
5) Edit userda hammasini to'g'irlab chiqamiz! 

6) Update qilamiz edit-userda formi actionida edit-userga o'zgartiramz! 
7) Delete qismini qilamiz! 




========= issuebook bo'limi =======
1) isuue-a-book.ejs bo'limiga kirib o'zgartirish kiritamiz
2) routerda ham yozib hammasini chiqazamiz keyin   isuue-a-book.ejs caegory selectga id qo'shamiz! 
keyin esa scriptda ajax ishlatamiz! Bu yerda qaysi categoryni tanlansa o'sha yerdagi kitoblarni chiqarib berishi kerak bo'ladi! 
