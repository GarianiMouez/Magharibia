import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { TextField, Button } from '@mui/material'
import jsPDF from 'jspdf'
import Image from 'next/image' // Importez Image depuis Next.js

function Example() {
  const schema = useMemo(
    () =>
      yup.object({
        email: yup.string().email().required(),
        name: yup.string().required()
      }),
    []
  )

  const handleDownloadClick = () => {
    // Créer un nouveau document PDF
    const doc = new jsPDF()

    const imgWidth = 35
    const imgHeight = 10

    // Ajoutez l'image à votre PDF
    doc.addImage('/images/logo.png', 'PNG', 10, 10, imgWidth, imgHeight)

    // Calculez la position horizontale de la date
    const pageWidth = doc.internal.pageSize.getWidth()
    const dateWidth =
      (doc.getStringUnitWidth('Date: 01/01/2022') * doc.internal.getFontSize()) / doc.internal.scaleFactor // Changez la date au format que vous voulez afficher
    const dateX = pageWidth - dateWidth - 10 // 10 est la marge à droite du PDF

    // Ajoutez la date actuelle sur la même ligne que le logo
    const currentDate = new Date().toLocaleDateString('fr-FR') // Obtenez la date actuelle au format souhaité
    doc.text(`Date: ${currentDate}`, dateX, 10) // Ajoutez la date au PDF sur la même ligne que le logo

    // Définir la police de caractères Times New Roman
    doc.setFont('times')

    // Ajoutez du texte au PDF
    doc.setTextColor(150) // Mettez la couleur du texte en gris
    doc.text('Contenu de votre PDF ici: ', 20, 50) // Texte en gras et gris
    doc.setTextColor(0) // Réinitialisez la couleur du texte en noir
    doc.text('150 Dt', 88, 50) // Texte en noir
    doc.setTextColor(0) // Réinitialisez la couleur du texte en noir pour les lignes suivantes

    // Obtenez la hauteur du texte
    const textHeight = doc.getTextDimensions('Contenu de votre PDF ici: ').h

    // Calculez la position verticale pour aligner les lignes
    const verticalPosition = 60 + textHeight + 5 // 5 est la marge entre les lignes

    // Ajoutez les deux lignes de texte sur le même niveau
    doc.text('Contenu de votre PDF ici', 20, verticalPosition)
    doc.text('Contenu de votre PDF ici', 20, verticalPosition + textHeight + 5) // Ajoutez un espacement entre les lignes

    // Ajoutez les signatures
    doc.text('Signature du client', 20, doc.internal.pageSize.getHeight() - 20) // Signature du client en bas à gauche
    doc.text('Signature de Maghribia', pageWidth - 70, doc.internal.pageSize.getHeight() - 20) // Signature de Maghribia en bas à droite

    // Téléchargez le PDF
    doc.save('example.pdf')
  }

  return (
    <>
      <Button onClick={handleDownloadClick}>Télécharger PDF</Button>
      <form>{/* Vos champs de formulaire ici */}</form>
    </>
  )
}

export default Example
