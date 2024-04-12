import pizza from "../../public/pizza.jpg";
import Image from "next/image"

export default function Home() {
  return (
    <main className="flex h-full flex-col">
      <div className="flex flex-col md:flex-row h-full">
        <Image src={pizza} className="w-full rounded-md h-1/2 md:h-full md:w-1/2" alt={"pizza"}/>
        <div className="flex flex-col justify-center items-center border-l-2 w-full px-2 h-1/2 md:h-full md:w-1/2">
          <p className="text-wrap w-full h-full text-justify p-4 ">Préparez-vous à une expérience gustative inoubliable ! Chez <strong>Pizza-Lito</strong>, chaque pizza est une œuvre d'art culinaire, élaborée avec des ingrédients frais et de qualité supérieure. De la croûte croustillante à la garniture généreuse,
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
