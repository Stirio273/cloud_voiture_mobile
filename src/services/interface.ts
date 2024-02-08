export interface Pays{
    id:number,
    libelle:string,
    etat:number
}

export interface Marque{
    id:number,
    libelle:string,
    pays:Pays,
    etat:number
}

export interface Categorie{
    id:number,
    libelle:string,
    etat:number
}

export interface Type{
    id:number,
    libelle:string,
    etat:number
}

export interface Utilisateur{
    id:number,
    nom:string,
    prenom:string,
    email:string,
    dtn:string,
}

export interface Carburant{
    id:number,
    libelle:string,
    etat:number
}

export interface Photo{
    link:string
}

export interface AnnonceProps{
    annonce : {
        id:string,
        nomVoiture:string,
        marque:Marque,
        categorie:Categorie,
        type:Type,
        prix:number,
        date:string,
        utilisateur:Utilisateur,
        carburant:Carburant,
        description:string,
        photo:Photo[],
        etat:number
    },
    afficherStatus:boolean,
    isFavorite:boolean
    
}

