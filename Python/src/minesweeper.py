#!/usr/bin/python3
# -*- coding: utf-8 -*-

"""
:mod:`minesweeper` module

:author: Nollet Antoine

:date:  04/10/2019

This module provides functions and a class for minesweeper's game's management.

"""

import random
from enum import Enum
from cell import Cell


################################################
# Type declaration
################################################

class GameState(Enum):
    """
    A class to define an enumerated type with three values :

    * ``winning``
    * ``losing``
    * ``unfinished``

    for the three state of minesweeper game.
    """
    winning = 1
    losing = 2
    unfinished = 3


##############################################
# Function for game's setup and management
##############################################


def neighborhood(x, y, width, height):
    """
    :param x: x-coordinate of a cell
    :type x: int
    :param y: y-coordinate of a cell
    :type y: int
    :param height: height of the grid
    :type height: int
    :param width: widthof the grid
    :type width: int
    :return: the list of coordinates of the neighbors of position (x,y) in a
             grid of size width*height
    :rtype: list of tuple
    :UC: 0 <= x < width and 0 <= y < height
    :Examples:

    >>> neighborhood(3, 3, 10, 10)
    [(2, 2), (2, 3), (2, 4), (3, 2), (3, 4), (4, 2), (4, 3), (4, 4)]
    >>> neighborhood(0, 3, 10, 10)
    [(0, 2), (0, 4), (1, 2), (1, 3), (1, 4)]
    >>> neighborhood(0, 0, 10, 10)
    [(0, 1), (1, 0), (1, 1)]
    >>> neighborhood(9, 9, 10, 10)
    [(8, 8), (8, 9), (9, 8)]
    >>> neighborhood(3, 9, 10, 10)
    [(2, 8), (2, 9), (3, 8), (4, 8), (4, 9)]
    """
    assert 0 <= x < width, "Select a valid line !"
    assert 0 <= y < height, "Select a valid column !"
    coord = []
    for l in range(-1,2):
        for c in range(-1,2):
            if ( 0 <= y+c < height) and ( 0 <= x+l < width) and ((x,y) != (x+l,y+c)):
                coord+= [(x+l,y+c)]
    return coord
            
            
        


class Minesweeper():
    """
    >>> game = Minesweeper(20, 10, 4)
    >>> game.get_width()
    20
    >>> game.get_height()
    10
    >>> game.get_nbombs()
    4
    >>> game.get_state() == GameState.unfinished 
    True
    >>> cel = game.get_cell(1, 2)
    >>> cel.is_revealed()
    False
    >>> 
    """

    def __init__(self, width=30, height=20, nbombs=99):
        """
        build a minesweeper grid of size width*height cells
        with nbombs bombs randomly placed.  

        :param width:[optional] horizontal size of game (default = 30)
        :type width: int
        :param height: [optional] vertical size of game (default = 20)
        :type height: int
        :param nbombs: [optional] number of bombs (default = 99)
        :type nbombs: int
        :return: a fresh grid of  width*height cells with nbombs bombs randomly placed.
        :rtype: Minesweeper
        :UC: width and height must be positive integers, and
             nbombs + 9 <= width * height
        :Example:

        >>> game = Minesweeper(20, 10, 4)
        >>> game.get_width()
        20
        >>> game.get_height()
        10
        >>> game.get_nbombs()
        4
        >>> game.get_state() == GameState.unfinished 
        True
        """
        assert type(width) == type(height) == type(nbombs) == int, "Width, height and number of bombs in the grid have to be integers !"
        assert width > 0 and height > 0, "Width and height have to be positive integers !"
        assert nbombs + 9 <= width * height, "There are too much bombs !"
        self.__width = width
        self.__height = height
        self.__nbombs = nbombs
        self.__grid = Minesweeper.create_grid(width,height)
        self.__click = False
        
    def create_grid(width, height):
        """
        Create a grid
        :param width:horizontal size of game
        :type width: int
        :param height: vertical size of game
        :type height: int
        :return: the grid of the game
        :rtype: list
        :UC: width and height must be positive integers
        """
        assert type(width) == type(height) == int, "Width, height and number of bombs in the grid have to be integers !"
        assert width > 0 and height > 0, "Width and height have to be positive integers !"
        newGrid = []
        for line in range(height):
            newLine = []
            for column in range(width):
                newCell = Cell()
                newLine += [newCell]
            newGrid += [newLine]
        return newGrid
            
    def put_bombs(self,x,y) :
        """
        Put bombs in the grid of self
        :param x: coordinate x of the cell where you cliked
        :type x: int
        :param y: coordinate y of the cell where you cliked
        :type y: int
        :return: the grid with the bombs randomly placed
        :rtype: list
        :UC: none
        """
        BombsPlacee = 0
        nbombs = self.get_nbombs()
        width = self.get_width()
        height = self.get_height()
        grid = self.get_grid()
        case1 = self.get_cell(x,y)
        voisinage = neighborhood(x,y,width,height)
        voisins = [case1] + [grid[voisinage[i][1]][voisinage[i][0]] for i in range(len(voisinage))]
        while BombsPlacee != nbombs:
            X = random.randint(0,width-1)
            Y = random.randint(0,height-1)
            cell = grid[Y][X]
            if not(cell.is_bomb() or (cell in voisins)):
                cell.set_bomb()
                BombsPlacee += 1
                Voisinage = neighborhood(X, Y, width, height)
                LesVoisins = [grid[Voisinage[i][1]][Voisinage[i][0]] for i in range(len(Voisinage))]
                for voisin in LesVoisins:
                    voisin.incr_number_of_bombs_in_neighborhood()
        return grid
    
    def print_grid(self):
        """
        Print the grid of minesweeper
        :UC: none
        """
        nb_col = self.get_width()
        pgrid = ' '
        for j in range(min(10,nb_col)):
            pgrid += " "+str(j)+"  "
        for j in range(10,nb_col):
            pgrid += " "+str(j)+" "
        pgrid += '\n'
        separation = ' '
        
        for i in range(nb_col):
            separation += "+---"
        separation += '+'
        pgrid += separation+'\n'
        for y in range(self.get_height()):
            ligne = str(y)+"|"
            for x in range(self.get_width()):
                c = ' '+str(self.get_cell(x,y))+'  '
                ligne += c
            pgrid += ligne+'\n'+separation+'\n'
        print(pgrid)

    def get_grid(self):
        """
        :return: the grid in self
        :rtype: list
        :UC: none
        """
        return self.__grid
    
    
    def get_height(self):
        """
        :return: height of the grid in self
        :rtype: int
        :UC: none
        """
        return self.__height


    def get_width(self):
        """
        :return: width of the grid in game
        :rtype: int
        :UC: none
            """
        return self.__width

    
    def get_nbombs(self):
        """
        :return: number of bombs in game
        :rtype: int
        :UC: none
        """
        return self.__nbombs



    def get_cell(self, x, y):
        """
        :param x: x-coordinate of a cell
        :type x: int
        :param y: y-coordinate of a cell
        :type y: int
        :return: the cell of coordinates (x,y) in the game's grid
        :type: cell
        :UC: 0 <= x < width of game and O <= y < height of game
        """
        assert 0 <= x < self.get_width(), "Select a correct line !"
        assert 0 <= y < self.get_height(), "Select a correct column !"
        return self.__grid[y][x]
        
        


    def get_state(self):
        """
        :return: the state of the game (winning, losing or unfinished)
        :rtype: GameState
        :UC: none
        """
        caseCoche = 0
        for line in self.__grid:
            for cell in line:
                if cell.is_bomb() and cell.is_revealed():
                    return GameState.losing
                elif cell.is_revealed():
                    caseCoche += 1
        if self.__width * self.__height - caseCoche == self.__nbombs:
            return GameState.winning
        else:
            return GameState.unfinished
                    

    def reveal_all_cells_from(self, x, y):
        """
        :param x: x-coordinate
        :param y: y-coordinate
        :return: none
        :side effect: reveal all cells of game game from the initial cell (x,y).
        :UC: 0 <= x < width of game and O <= y < height of game
        """
        width = self.get_width()
        height = self.get_height()
        assert 0 <= x < width, "Select a correct line !"
        assert 0 <= y < height, "Select a correct column !"
        casecoche = self.get_cell(x,y)
        if self.__click == False:
            self.__click = True
            self.__grid = self.put_bombs(x,y)
        casecoche.reveal()
        if not(casecoche.is_bomb()) and casecoche.number_of_bombs_in_neighborhood() == 0:
            lesVoisins = neighborhood(x, y, width, height)
            for voisin in lesVoisins:
                X = voisin[0]
                Y = voisin[1]
                if not(self.get_cell(X,Y).is_revealed()):
                    self.reveal_all_cells_from(X,Y)


if __name__ == '__main__':
    import doctest
    doctest.testmod(optionflags=doctest.NORMALIZE_WHITESPACE | doctest.ELLIPSIS, verbose=True)
    