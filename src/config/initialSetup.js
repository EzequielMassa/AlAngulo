import bcrypt from 'bcrypt'
import { CartModel } from '../models/Cart.model.js'
import { CategoryModel } from '../models/Category.model.js'
import { ProductModel } from '../models/Product.models.js'
import RoleModel from '../models/Role.model.js'
import { SoccerFieldModel } from '../models/SoccerField.model.js'
import { UserModel } from '../models/User.model.js'
export const createSoccerFields = async () => {
	try {
		const count = await SoccerFieldModel.estimatedDocumentCount()

		if (count > 0) return

		await Promise.all([
			new SoccerFieldModel({
				name: 'La mundialista',
				description: 'Cancha en honor a los campeones del mundo',
				price: 15000,
				grass: 'natural',
				size: 11,
				imgUrl:
					'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiaSWnekiFRIjEnozOhh9klkhKU4mQl0ojIyDqiTO97o7HsAJ0anZb40OFHGc9UXnSUSGis9ag3EPOL8QfkW5N-NQ7su5CPTb1Yn9OqQaqaYo7JUivfxRdhg1jGk6AkTyNB4XdWgy7ui2k/s1600/index1.jpg',
			}).save(),
			new SoccerFieldModel({
				name: 'El potrerito',
				description: 'Cancha con nostalgia a los viejos potreros',
				price: 10000,
				grass: 'sintetico',
				size: 5,
				imgUrl:
					'https://www.hoysejuega.com/uploads/Modules/ImagenesComplejos/1357.jpg',
			}).save(),
			new SoccerFieldModel({
				name: 'La rustica',
				description: 'Cancha rapida ideal para los mas rusticos',
				price: 12000,
				grass: 'sintetico',
				size: 11,
			}).save(),
		])
	} catch (error) {
		console.error(error)
	}
}
export const createProducts = async () => {
	try {
		const count = await ProductModel.estimatedDocumentCount()

		if (count > 0) return

		const tshirtCategory = await CategoryModel.findOne({ name: 'Remeras' })
		const soccerBallCategory = await CategoryModel.findOne({ name: 'Pelotas' })
		const drinksCategory = await CategoryModel.findOne({ name: 'Bebidas' })

		await Promise.all([
			new ProductModel({
				name: 'Camiseta AlAngulo Femenina',
				description:
					'Diseñada para destacar en la cancha, nuestra camiseta de fútbol femenino combina estilo y rendimiento. Confeccionada con tejido transpirable que absorbe la humedad, te mantendrá fresca y seca durante todo el juego. Su corte ajustado y femenino ofrece comodidad y libertad de movimiento, mientras que el diseño moderno y dinámico garantiza que te veas tan bien como juegas. Ya sea en el entrenamiento o en el partido, esta camiseta es la elección perfecta para las jugadoras que buscan estilo y funcionalidad en la cancha.',
				category: tshirtCategory._id,
				price: 7500,
				image: 'https://i.imgur.com/GvSdhoT.png',
			}).save(),
			new ProductModel({
				name: 'Camiseta AlAngulo Femenina Alt',
				description:
					'Diseñada para destacar en la cancha, nuestra camiseta de fútbol femenino combina estilo y rendimiento. Confeccionada con tejido transpirable que absorbe la humedad, te mantendrá fresca y seca durante todo el juego. Su corte ajustado y femenino ofrece comodidad y libertad de movimiento, mientras que el diseño moderno y dinámico garantiza que te veas tan bien como juegas. Ya sea en el entrenamiento o en el partido, esta camiseta es la elección perfecta para las jugadoras que buscan estilo y funcionalidad en la cancha.',
				category: tshirtCategory._id,
				price: 8500,
				image: 'https://i.imgur.com/dhHUv2Q.png',
			}).save(),
			new ProductModel({
				name: 'Camiseta AlAngulo Masculino',
				description:
					'Diseñada para potenciar tu rendimiento y estilo. Fabricada con tejido de alta calidad que proporciona ventilación y absorción de humedad, esta camiseta te mantendrá fresco durante los momentos más intensos del partido. Su corte atlético ofrece una silueta dinámica y cómoda, permitiéndote mover con libertad. Con un diseño clásico pero impactante, esta camiseta es la elección ideal para jugadores que buscan destacar en el campo con estilo y funcionalidad incomparables.',
				category: tshirtCategory._id,
				price: 8500,
				image: 'https://i.imgur.com/iIhg9Ch.png',
			}).save(),
			new ProductModel({
				name: 'Camiseta AlAngulo Masculino Alt',
				description:
					'Diseñada para potenciar tu rendimiento y estilo. Fabricada con tejido de alta calidad que proporciona ventilación y absorción de humedad, esta camiseta te mantendrá fresco durante los momentos más intensos del partido. Su corte atlético ofrece una silueta dinámica y cómoda, permitiéndote mover con libertad. Con un diseño clásico pero impactante, esta camiseta es la elección ideal para jugadores que buscan destacar en el campo con estilo y funcionalidad incomparables.',
				category: tshirtCategory._id,
				price: 10000,
				image: 'https://i.imgur.com/YxqFiPe.png',
			}).save(),
			new ProductModel({
				name: 'Pelota Adidas',
				description:
					'Domina el campo con la pelota de fútbol Adidas, el compañero perfecto para tus entrenamientos y partidos. Diseñada con la más alta tecnología y materiales de calidad, esta pelota ofrece un rendimiento excepcional en cualquier superficie.',
				category: soccerBallCategory._id,
				price: 75000,
				image: 'https://i.imgur.com/tipfgS4.png',
			}).save(),
			new ProductModel({
				name: 'Pelota DRB',
				description:
					'Explora nuevos horizontes en el mundo del fútbol con la pelota DRB (Dynamic Response Ball), diseñada para desatar tu máximo potencial en la cancha. Con una combinación innovadora de tecnología y diseño, la DRB ofrece un control excepcional y una respuesta dinámica en cada toque. ',
				category: soccerBallCategory._id,
				price: 85000,
				image: 'https://i.imgur.com/1enCq8l.png',
			}).save(),
			new ProductModel({
				name: 'Pelota NRB',
				description:
					'Desata tu pasión por el fútbol con la pelota NRB (Next-Generation Response Ball), diseñada para llevar tu juego al siguiente nivel. Equipada con tecnología de vanguardia y un diseño aerodinámico, la NRB ofrece un rendimiento excepcional en el campo. Su superficie texturizada proporciona un control óptimo, permitiéndote realizar pases precisos y disparos potentes con confianza.',
				category: soccerBallCategory._id,
				price: 65000,
				image: 'https://i.imgur.com/zHEgEep.png',
			}).save(),
			new ProductModel({
				name: 'Coca Cola 2 Litros ',
				description:
					'Disfruta de la refrescante y deliciosa experiencia de Coca-Cola en su presentación de 2 litros, ideal para compartir momentos inolvidables con amigos y familiares. Esta icónica bebida, conocida por su sabor único y burbujeante, te brinda la energía necesaria para cualquier ocasión.',
				category: drinksCategory._id,
				price: 1500,
				image: 'https://i.imgur.com/18eM37M.png',
			}).save(),
			new ProductModel({
				name: 'Mirinda Manzana 2 Litros ',
				description:
					'Sumergite en el sabor refrescante y natural de la manzana con nuestra Mirinda de Manzana, una explosión de frescura en cada sorbo.',
				category: drinksCategory._id,
				price: 1300,
				image: 'https://i.imgur.com/yCr3Di7.png',
			}).save(),
			new ProductModel({
				name: 'Quilmes Rubia 1 Litro ',
				description:
					'Descubre el sabor auténtico de la tradición cervecera argentina con nuestra cerveza Quilmes. Elaborada con los mejores ingredientes y siguiendo rigurosos estándares de calidad, cada sorbo de Quilmes te transporta a las vastas llanuras de Argentina.',
				category: drinksCategory._id,
				price: 2300,
				image: 'https://i.imgur.com/i06iVYM.png',
			}).save(),
			new ProductModel({
				name: 'Pepsi 2 Litros ',
				description:
					'Sumérgete en el sabor audaz y refrescante de Pepsi, la icónica bebida que ha deleitado a millones en todo el mundo. Cada sorbo de Pepsi es una explosión de sabor, combinando la dulzura perfecta con un toque de frescura que te deja con ganas de más.',
				category: drinksCategory._id,
				price: 1400,
				image: 'https://i.imgur.com/jdeK1bJ.png',
			}).save(),
			new ProductModel({
				name: 'Agua Benedictino 2 Litros ',
				description:
					'Refresca tu cuerpo y mente con el agua mineral natural Benedictino, una opción premium para hidratarte y revitalizarte en cualquier momento del día. Proveniente de fuentes puras y cristalinas, cada gota de Benedictino es una invitación a la pureza y la frescura.',
				category: drinksCategory._id,
				price: 1400,
				image: 'https://i.imgur.com/4vuztmR.png',
			}).save(),
		])
	} catch (error) {
		console.error(error)
	}
}

export const createDefaultCategories = async () => {
	try {
		const count = await CategoryModel.estimatedDocumentCount()

		if (count > 0) return

		await Promise.all([
			new CategoryModel({
				name: 'Remeras',
				description: 'Las mejores remeras futboleras de AlAngulo',
				image: 'https://i.imgur.com/YxqFiPe.png',
			}).save(),
			new CategoryModel({
				name: 'Pelotas',
				description: 'Las mejores pelotas futboleras de AlAngulo',
				image: 'https://i.imgur.com/tipfgS4.png',
			}).save(),
			new CategoryModel({
				name: 'Tazas',
				description: 'Las mejores tazas futboleras de AlAngulo',
				image: 'https://i.imgur.com/AwiRQcE.png',
			}).save(),
			new CategoryModel({
				name: 'Bebidas',
				description: 'Las mejores bebidas de AlAngulo',
				image: 'https://i.imgur.com/gUZHaCA.png',
			}).save(),
			new CategoryModel({
				name: 'Botines',
				description: 'Los mejores botines de AlAngulo',
				image: 'https://i.imgur.com/xPfB3iV.png',
			}).save(),
			new CategoryModel({
				name: 'Medias',
				description: 'Las mejores medias de AlAngulo',
				image: 'https://i.imgur.com/GfALFy1.png',
			}).save(),
		])
	} catch (error) {
		console.error(error)
	}
}

export const initialUsers = async () => {
	try {
		const count = await UserModel.estimatedDocumentCount()
		const adminUser = await RoleModel.findOne({ name: 'admin' })
		const user = await RoleModel.findOne({ name: 'user' })
		const salt = await bcrypt.genSalt(10)
		const passwordHashAdmin = await bcrypt.hash('admin1234', salt)
		const passwordHashUser = await bcrypt.hash('user1234', salt)
		if (count > 0) return
		await Promise.all([
			new UserModel({
				name: 'Administrador',
				lastname: 'al angulo',
				email: 'adminalangulo@gmail.com',
				phone: 3816646368,
				password: passwordHashAdmin,
				image: 'https://i.imgur.com/I03y2Ec.png',
				role: adminUser._id,
			}).save(),
			new UserModel({
				name: 'Usuario',
				lastname: 'al angulo',
				email: 'usuarioalangulo@gmail.com',
				phone: 3817724663,
				password: passwordHashUser,
				image: 'https://i.imgur.com/I03y2Ec.png',
				role: user._id,
				active: true,
			}).save(),
		])

		const adminFound = await UserModel.findOne({
			email: 'adminalangulo@gmail.com',
		})
		const userFound = await UserModel.findOne({
			email: 'usuarioalangulo@gmail.com',
		})

		await Promise.all([
			new CartModel({
				user: adminFound._id,
				orders: [],
				bookings: [],
				total: 0,
			}).save(),
			new CartModel({
				user: userFound._id,
				orders: [],
				bookings: [],
				total: 0,
			}).save(),
		])
	} catch (error) {
		console.error(error)
	}
}
