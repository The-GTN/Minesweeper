from minesweeper import *

import sys
from cell import Cell

def main():
    """
    main function for graphical minesweeper game
    """
    if len(sys.argv) == 4:
        width = int(sys.argv[1])
        height = int(sys.argv[2])
        nbombs = int(sys.argv[3])
    else:
        width = 20
        height = 10
        nbombs = 1
    move = ['r','R','s','S','u','U']
    game = Minesweeper(width, height, nbombs)
    state = game.get_state()

    game.print_grid()
    while state == GameState.unfinished:
        rep = input("Your play x,y,C (C=(R)eveal,(S)et,(U)nset):")
        x,y,c = rep.split(",")
        
        while not(x.isdigit()) or not(y.isdigit()) or not(c in move):
            print('Please, choose a good move')
            rep = input("Your play x,y,C (C=(R)eveal,(S)et,(U)nset):")
            x,y,c = rep.split(",")    
        x,y = int(x), int(y)
        
        if c == 'R' or c == 'r':
            game.reveal_all_cells_from(x, y)
        elif c == 'S' or c == 's':
            cell.set_hypothetic()
        elif c == 'u' or c == 'U':
            cell.unset_hypothetic()
              
        game.print_grid()
        state = game.get_state()
        
        
    grid = game.get_grid()
    for y in range(game.get_height()):
        for x in range(game.get_width()):
            cell = game.get_cell(x,y)
            if not(cell.is_revealed()) and not(cell.is_hypothetic()):
                    cell.set_hypothetic()
    state = game.get_state()
    
    game.print_grid()
    if state == GameState.losing:
        
        print("You lose !")
    else:
        print("You win !")
    
    


if __name__ == '__main__':
    main()