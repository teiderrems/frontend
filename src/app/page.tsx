import pizza from "../../public/pizza.jpg";
import Image from "next/image"

export default function Home() {

  return (
    <main className="flex h-full flex-col">
      <div className="flex flex-col md:flex-row h-full">
        <div className="flex flex-col md:flex-row justify-center items-center w-full h-1/2 md:h-screen md:w-screen">
          <Image src={pizza} className="md:w-2/5 rounded-lg" alt={"pizza"}/>
          <p className="text-wrap md:w-2/5 h-3/4 p-8 ">Préparez-vous à une expérience gustative inoubliable ! Chez <strong>Pizza-Lito</strong>, chaque pizza est une œuvre d'art culinaire, élaborée avec des ingrédients frais et de qualité supérieure. De la croûte croustillante à la garniture généreuse,
          chaque bouchée vous transporte en Italie. Explorez notre menu diversifié,
            des classiques intemporels aux créations innovantes, 
            et laissez-vous séduire par notre passion pour la perfection pizzaïolo. 
            Commandez dès maintenant pour une explosion de saveurs directement dans votre assiette.
            <strong>Buon appetito !</strong></p>
        </div>
      </div>
    </main>
  );
}
