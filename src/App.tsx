import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Lightbulb,
  HelpCircle,
  ImageIcon,
} from 'lucide-react';
import { flashcardsData } from '@/lib/flashcards-data';
import diagram from './assets/images/figura-imagem.jpg';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDicas, setShowDicas] = useState(false);
  const [showPerguntas, setShowPerguntas] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const currentCard = flashcardsData[currentIndex];

  const handleNext = () => {
    if (currentIndex < flashcardsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetCardState();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetCardState();
    }
  };

  const resetCardState = () => {
    setIsFlipped(false);
    setShowDicas(false);
    setShowPerguntas(false);
    setShowImage(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <main className='min-h-screen bg-background py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-foreground mb-2'>Flashcards de Redes</h1>
          <p className='text-muted-foreground'>Exame Modelo - Questões de Preparação</p>
          <div className='mt-4 flex items-center justify-center gap-2'>
            <span className='text-sm font-medium text-primary'>
              Cartão {currentIndex + 1} de {flashcardsData.length}
            </span>
            <div className='w-48 h-2 bg-muted rounded-full overflow-hidden'>
              <div
                className='h-full bg-primary transition-all duration-300'
                style={{
                  width: `${((currentIndex + 1) / flashcardsData.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Flashcard */}
        <div className='perspective-1000 mb-6'>
          <div
            className={`relative w-full min-h-[400px] transition-transform duration-500 transform-style-3d cursor-pointer ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={handleFlip}
          >
            {/* Front - Question */}
            <Card
              className={`absolute inset-0 backface-hidden border-2 border-primary/20 ${
                isFlipped ? 'invisible' : 'visible'
              }`}
            >
              <CardContent className='p-8 h-full flex flex-col'>
                <div className='flex items-center gap-2 mb-4'>
                  <span className='px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium'>
                    Questão {currentCard.id}
                  </span>
                  {currentCard.subQuestion && (
                    <span className='px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm'>
                      {currentCard.subQuestion}
                    </span>
                  )}
                </div>
                <div className='flex-1 flex items-center justify-center'>
                  <p className='text-xl text-foreground text-center leading-relaxed'>
                    {currentCard.question}
                  </p>
                </div>
                <p className='text-center text-muted-foreground text-sm mt-4'>
                  Clica para ver a resposta
                </p>
              </CardContent>
            </Card>

            {/* Back - Answer */}
            <Card
              className={`absolute inset-0 backface-hidden rotate-y-180 border-2 border-green-500/20 bg-card ${
                isFlipped ? 'visible' : 'invisible'
              }`}
            >
              <CardContent className='p-8 h-full flex flex-col overflow-y-auto'>
                <div className='flex items-center gap-2 mb-4'>
                  <span className='px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-medium'>
                    Resposta
                  </span>
                </div>
                <div className='flex-1'>
                  <div className='text-foreground leading-relaxed whitespace-pre-line'>
                    {currentCard.answer}
                  </div>
                </div>
                <p className='text-center text-muted-foreground text-sm mt-4'>
                  Clica para voltar à pergunta
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-wrap justify-center gap-3 mb-6'>
          <Button
            variant={showDicas ? 'default' : 'outline'}
            onClick={() => setShowDicas(!showDicas)}
            className='gap-2'
          >
            <Lightbulb className='w-4 h-4' />
            {showDicas ? 'Ocultar Dicas' : 'Ver Dicas'}
          </Button>
          <Button
            variant={showPerguntas ? 'default' : 'outline'}
            onClick={() => setShowPerguntas(!showPerguntas)}
            className='gap-2'
          >
            <HelpCircle className='w-4 h-4' />
            {showPerguntas ? 'Ocultar Perguntas' : 'Perguntas Orientadoras'}
          </Button>
          {currentCard.hasImage && (
            <Button
              variant={showImage ? 'default' : 'outline'}
              onClick={() => setShowImage(!showImage)}
              className='gap-2'
            >
              <ImageIcon className='w-4 h-4' />
              {showImage ? 'Ocultar Diagrama' : 'Ver Diagrama'}
            </Button>
          )}
        </div>

        {/* Dicas Section */}
        {showDicas && (
          <Card className='mb-4 border-amber-500/30 bg-amber-500/5'>
            <CardContent className='p-6'>
              <h3 className='font-semibold text-amber-600 mb-3 flex items-center gap-2'>
                <Lightbulb className='w-5 h-5' />
                Dicas para esta pergunta
              </h3>
              <ul className='space-y-2'>
                {currentCard.dicas.map((dica, index) => (
                  <li key={index} className='text-foreground flex items-start gap-2'>
                    <span className='text-amber-500 mt-1'>•</span>
                    <span>{dica}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Perguntas Orientadoras Section */}
        {showPerguntas && (
          <Card className='mb-4 border-blue-500/30 bg-blue-500/5'>
            <CardContent className='p-6'>
              <h3 className='font-semibold text-blue-600 mb-3 flex items-center gap-2'>
                <HelpCircle className='w-5 h-5' />
                Perguntas Orientadoras
              </h3>
              <ul className='space-y-2'>
                {currentCard.perguntasOrientadoras.map((pergunta, index) => (
                  <li key={index} className='text-foreground flex items-start gap-2'>
                    <span className='text-blue-500 mt-1'>{index + 1}.</span>
                    <span>{pergunta}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Image Section */}
        {showImage && currentCard.hasImage && (
          <Card className='mb-4 border-purple-500/30 bg-purple-500/5'>
            <CardContent className='p-6'>
              <h3 className='font-semibold text-purple-600 mb-3 flex items-center gap-2'>
                <ImageIcon className='w-5 h-5' />
                Diagrama de Rede
              </h3>
              <div className='flex justify-center'>
                <img
                  src={diagram}
                  alt='Diagrama de rede com R1, R2, SW1, SW2, SW3, PC0, PC1, PC2 e PC3'
                  className='max-w-full rounded-lg shadow-md'
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className='flex items-center justify-between'>
          <Button
            variant='outline'
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className='gap-2 bg-transparent'
          >
            <ChevronLeft className='w-4 h-4' />
            Anterior
          </Button>

          <Button variant='ghost' onClick={resetCardState} className='gap-2'>
            <RotateCcw className='w-4 h-4' />
            Reiniciar
          </Button>

          <Button
            variant='outline'
            onClick={handleNext}
            disabled={currentIndex === flashcardsData.length - 1}
            className='gap-2 bg-transparent'
          >
            Próximo
            <ChevronRight className='w-4 h-4' />
          </Button>
        </div>

        {/* Card Grid Navigation */}
        <div className='mt-8'>
          <h3 className='text-sm font-medium text-muted-foreground mb-3 text-center'>
            Navegar por questão
          </h3>
          <div className='flex flex-wrap justify-center gap-2'>
            {flashcardsData.map((card, index) => (
              <Button
                key={card.id + (card.subQuestion || '')}
                variant={currentIndex === index ? 'default' : 'outline'}
                size='sm'
                onClick={() => {
                  setCurrentIndex(index);
                  resetCardState();
                }}
                className='w-auto px-3'
              >
                Q{card.id}
                {card.subQuestion && <span className='text-xs ml-1'>{card.subQuestion}</span>}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
