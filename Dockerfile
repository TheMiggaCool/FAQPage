FROM eclipse-temurin:26-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

CMD ["sh", "-c", "java -jar target/FAQPage-0.0.1-SNAPSHOT.jar"]