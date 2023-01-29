import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorAlertService {
  constructor(private alertCtrl: AlertController) {}

  async displayCommentErrorAlert(error) {
    const alert = await this.alertCtrl.create({
      header: 'Erreur de chargement',
      subHeader: error,
      message: 'Impossible de charger les commentaires',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async displayCommentListErrorAlert(error) {
    const alert = await this.alertCtrl.create({
      header: 'Erreur de chargement',
      subHeader: error,
      message: 'Impossible de charger la liste des commentaires',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async displayCommentCreationErrorAlert(error) {
    const alert = await this.alertCtrl.create({
      header: 'Erreur de création',
      subHeader: error,
      message: 'Impossible de créer le commentaire',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async displayCategoryErrorAlert(error) {
    const alert = await this.alertCtrl.create({
      header: 'Erreur de chargement',
      subHeader: error,
      message: 'Impossible de charger la catégorie',
      buttons: ['OK'],
    });

    await alert.present();
  }

  displayCategoryListErrorAlert(error) {
    const alert = this.alertCtrl.create({
      header: 'Erreur de chargement',
      subHeader: error,
      message: 'Impossible de charger la liste des catégories',
      buttons: ['OK'],
    });

    alert.then((alert) => alert.present());
  }

  async displaySoundErrorAlert(error) {
    const alert = await this.alertCtrl.create({
      header: 'Erreur de chargement',
      subHeader: error,
      message: 'Impossible de charger le son',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async displaySoundListErrorAlert(error) {
    const alert = await this.alertCtrl.create({
      header: 'Erreur de chargement',
      subHeader: error,
      message: 'Impossible de charger la liste des sons',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async displaySoundCreationErrorAlert(error) {
    const alert = await this.alertCtrl.create({
      header: 'Erreur de création',
      subHeader: error,
      message: 'Impossible de créer le son',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async displaySoundDataErrorAlert(error) {
    const alert = await this.alertCtrl.create({
      header: 'Erreur de chargement',
      subHeader: error,
      message: 'Impossible de charger les données du son',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async displayUserErrorAlert(error) {
    const alert = await this.alertCtrl.create({
      header: 'Erreur de chargement',
      subHeader: error,
      message: "Impossible de charger l'utilisateur",
      buttons: ['OK'],
    });

    await alert.present();
  }

  async displayPassowrdsDontMatchErrorAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Erreur de modification',
      message: 'Les mots de passe ne correspondent pas',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async displayUserLoginErrorAlert(error) {
    const alert = await this.alertCtrl.create({
      header: 'Erreur de connexion',
      subHeader: error,
      message: 'Impossible de se connecter',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async displayUserRegistrationErrorAlert(error) {
    const alert = await this.alertCtrl.create({
      header: "Erreur d'inscription",
      subHeader: error,
      message: 'Impossible de créer le compte',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async displayGeoLocationErrorAlert(error) {
    const alert = await this.alertCtrl.create({
      header: 'Erreur de géolocalisation',
      subHeader: error,
      message: 'Impossible de récupérer la position',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
